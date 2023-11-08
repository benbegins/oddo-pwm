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
}




Timber::render( array( 'pages/page-' . $page_name . '.twig', 'pages/page.twig' ), $context );