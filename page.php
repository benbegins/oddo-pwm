<?php
$context = Timber::context();
$timber_post = new Timber\Post();

$context['post'] = $timber_post;
$context['version'] = null;

// Version
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

// Home
$page_accueil = pll_home_url();
if($context['version']){
    $page_accueil = get_the_permalink(pll_get_post(get_page_by_path($context['version'])->ID));
}
$context['home'] = $page_accueil;


$template = ('pages/page.twig');

Timber::render( $template, $context );