<?php
// acf_to_rest_api : Enable the option show in rest
add_filter( 'acf/rest_api/field_settings/show_in_rest', '__return_true' );

// Register new route
add_action( 'rest_api_init', function(){
    register_rest_route( 'bemy/v1', '/version/', array(
        'methods' => 'GET',
        'callback' => 'api_version',
        'args' => array(
            'version' => array(
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'lang' => array(
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ),
        )
    ) );
});


/**
 * Return the version of the site
 * @return WP_REST_Response
 */
function api_version(WP_REST_Request $request) {
    $version = $request->get_param('version');
    $lang = $request->get_param('lang');

    // Sanity check
    if ( ! $version || ! $lang ) {
        return new WP_Error( 'no_data', 'No data', array( 'status' => 404 ) );
    }
    sanitize_text_field( $version );
    sanitize_text_field( $lang );
    
    // Get versions availables
    $taxonomy_version = get_terms( array(
        'taxonomy' => 'version',
        'hide_empty' => false,
    ) );
    $versions_available = array();
    foreach ( $taxonomy_version as $term ) {
        $versions_available[] = $term->slug;
    }

    // Languages availables
    $languages_available = pll_languages_list( array(
        'hide_empty' => 0,
        'fields' => 'slug',
    ));

    // Check if version and lang are available
    if ( ! in_array( $version, $versions_available ) || ! in_array( $lang, $languages_available ) ) {
        return new WP_Error( 'no_data', 'No data', array( 'status' => 404 ) );
    }

    // Get home page url for the version and lang
    $args = array(
        'post_type' => 'page',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'tax_query' => array(
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => $version,
            ),
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'home',
            ),
        ),
        'lang' => $lang,
    );
    $page_accueil_query = new WP_Query( $args );
    if( ! $page_accueil_query->have_posts() ) {
        return new WP_Error( 'no_data', 'No data', array( 'status' => 404 ) );
    }
    $page_accueil = get_the_permalink( $page_accueil_query->posts[0]->ID);

    // Return data
    $output = array(
        'success' => true,
        'version' => $version,
        'lang' => $lang,
        'versions_available' => $versions_available,
        'languages_available' => $languages_available,
        'home_url' => $page_accueil,
    );

    return new WP_REST_Response( $output );
    
}