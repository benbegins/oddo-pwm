<?php
$context = Timber::context();
$timber_post = new Timber\Post();

$context['post'] = $timber_post;


/**
 * Get the current menu for the current version
 */
// Version
$context['version'] = null;
$version = get_the_terms($timber_post->ID, 'version');
if ($version){
    $context['version'] = $version[0]->slug;

    switch ($context['version']) {
        case 'france':
            $context['menu'] = new \Timber\Menu( 'menu-france' );
            break;

        case 'germany':
            $context['menu'] = new \Timber\Menu( 'menu-germany' );
            break;

        case 'switzerland':
            $context['menu'] = new \Timber\Menu( 'menu-switzerland' );
            break;
        
        default:
            $context['menu'] = new \Timber\Menu( 'menu-france' );
            break;
    }
}
// Get home page version link
$page_accueil = pll_home_url();
if($context['version']){
    $page_accueil = get_the_permalink(pll_get_post(get_page_by_path($context['version'])->ID));
}
$context['home'] = $page_accueil;







/**
 * 
 * PAGES
 * 
 */
$page_name = '';
$type_de_page = get_the_terms($timber_post->ID, 'type-de-page');
if ($type_de_page){
    $type_de_page = $type_de_page[0]->slug;
}

/**
 * MAIN HOME PAGE
 */
if (is_front_page()) {
    $page_name = 'home';

    $home_france = get_the_permalink(pll_get_post(get_page_by_path('france')->ID));
    $home_germany = get_the_permalink(pll_get_post(get_page_by_path('germany')->ID));
    $home_switzeland = get_the_permalink(pll_get_post(get_page_by_path('switzerland')->ID));
    // Get redirect page link for 3 versions
    $context['redirect'] = $home_france . ',' . $home_germany . ',' . $home_switzeland;
}


/**
 * HOME VERSION
 */
if($type_de_page == 'home'){
    $page_name = 'home-version';
}



/**
 * ABOUT PAGE
 */
if($type_de_page == 'about'){
    $page_name = 'about';
}



/**
 * MANAGER PAGE
 */
if($type_de_page == 'manager'){
    $page_name = 'manager';
    $context['hero_light'] = true;

    $manager = $_GET['person'];
    $manager = sanitize_text_field( $manager );

    if(!$manager){
        wp_redirect( $context['home'] );
        exit;
    }

    $args = array(
        'post_type' => 'manager',
        'name' => $manager,
    );
    $manager_post = Timber::get_posts( $args );


    if(!$manager_post) {
        wp_redirect( $context['home'] );
        exit;
    }
    
    $context['manager'] = $manager_post[0];
}



/**
 * EXPERTISE PAGE
 */
if($type_de_page == 'expertise'){
    $page_name = 'expertise';

    $args = array(
        'post_type' => 'page',
        'posts_per_page' => -1,
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'expertise',
            ),
        ),
    );
    $other_expertises = Timber::get_posts( $args );

    if($other_expertises){
        // Get the index of the current expertise
        $current_expertise_index = array_search($timber_post->ID, array_column($other_expertises, 'ID'));
        // Reorder the array to put the next expertises first
        $other_expertises = array_merge(array_slice($other_expertises, $current_expertise_index + 1), array_slice($other_expertises, 0, $current_expertise_index + 1));

        $context['other_expertises'] = $other_expertises;
    }
}




Timber::render( array( 'pages/page-' . $page_name . '.twig', 'pages/page.twig' ), $context );