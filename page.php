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

// Get the footer menu
$context['footer_menu'] = new \Timber\Menu( 'footer' );

// Get home page version link
$page_accueil = pll_home_url();
if($context['version']){
    $query_accueil = get_posts(array(
        'post_type' => 'page',
        'posts_per_page' => 1,
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'home',
            ),
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => $context['version'],
            ),
        ),
    ));

    if($query_accueil){
        $page_accueil = get_the_permalink(pll_get_post($query_accueil[0]->ID));
    }
}
$context['home'] = $page_accueil;



// Get page agences
$page_agences = get_posts(array(
    'post_type' => 'page',
    'posts_per_page' => 1,
    'tax_query' => array(
        array(
            'taxonomy' => 'type-de-page',
            'field' => 'slug',
            'terms' => 'implantations',
        ),
        array(
            'taxonomy' => 'version',
            'field' => 'slug',
            'terms' => $context['version'],
        ),
    ),
));

if ($page_agences){
    $context['page_agences'] = get_the_permalink(pll_get_post($page_agences[0]->ID));
} else {
    $context['page_agences'] = $context['home'];
}




// Get page contact
$page_contact = get_posts(array(
    'post_type' => 'page',
    'posts_per_page' => 1,
    'tax_query' => array(
        array(
            'taxonomy' => 'type-de-page',
            'field' => 'slug',
            'terms' => 'contact',
        ),
        array(
            'taxonomy' => 'version',
            'field' => 'slug',
            'terms' => $context['version'],
        ),
    ),
));

if ($page_contact){
    $context['page_contact'] = get_the_permalink(pll_get_post($page_contact[0]->ID));
} else {
    $context['page_contact'] = $context['home'];
}







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
    $home_france = null;
    $home_germany = null;
    $home_switzerland = null;

    // Home Version France
    $query_home_france = get_posts(array(
        'post_type' => 'page',
        'posts_per_page' => 1,
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'home',
            ),
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => 'france',
            ),
        ),
    ));
    if($query_home_france){
        $home_france = get_the_permalink(pll_get_post($query_home_france[0]->ID));
    }

    // Home Version Germany
    $query_home_germany = get_posts(array(
        'post_type' => 'page',
        'posts_per_page' => 1,
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'home',
            ),
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => 'germany',
            ),
        ),
    ));
    if($query_home_germany){
        $home_germany = get_the_permalink(pll_get_post($query_home_germany[0]->ID));
    }

    // Home Version Switzerland
    $query_home_switzerland = get_posts(array(
        'post_type' => 'page',
        'posts_per_page' => 1,
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'home',
            ),
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => 'switzerland',
            ),
        ),
    ));
    if($query_home_switzerland){
        $home_switzerland = get_the_permalink(pll_get_post($query_home_switzerland[0]->ID));
    }

    // Get redirect page link for 3 versions
    $context['redirect'] = $home_france . ',' . $home_germany . ',' . $home_switzerland;
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

    // $page_manager = get_posts(array(
    //     'post_type' => 'page',
    //     'posts_per_page' => 1,
    //     'tax_query' => array(
    //         array(
    //             'taxonomy' => 'type-de-page',
    //             'field' => 'slug',
    //             'terms' => 'manager',
    //         ),
    //         array(
    //             'taxonomy' => 'version',
    //             'field' => 'slug',
    //             'terms' => $context['version'],
    //         ),
    //     ),
    // ));
    
    // if ($page_manager){
    //     $context['page_manager'] = get_the_permalink(pll_get_post($page_manager[0]->ID));
    // } else {
    //     $context['page_manager'] = $context['home'];
    // }

    // Get children pages of the current page with taxonomy "type-de-page" = "manager"
    $args = array(
        'post_type' => 'page',
        'posts_per_page' => -1,
        'post_parent' => $timber_post->ID,
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'manager',
            ),
        ),
    );
    $managers = Timber::get_posts( $args );

    if($managers){
        foreach($managers as $manager){
            // create an array with the manager post object and the custom field "manager" (which is a post object)
            $context['managers'][] = array(
                'permalink' => get_the_permalink($manager),
                'manager' => new Timber\Post(get_field('manager', $manager->ID)),
            );
        }
    }
}



/**
 * MANAGER PAGE
 */
if($type_de_page == 'manager'){
    $page_name = 'manager';
    $context['hero_light'] = true;

    $manager = get_field('manager', $timber_post->ID);

    if($manager){
        $context['manager'] = new Timber\Post($manager);
    }

    // $manager = $_GET['person'];
    // $manager = sanitize_text_field( $manager );

    // if(!$manager){
    //     wp_redirect( $context['home'] );
    //     exit;
    // }

    // $args = array(
    //     'post_type' => 'manager',
    //     'name' => $manager,
    // );
    // $manager_post = Timber::get_posts( $args );


    // if(!$manager_post) {
    //     wp_redirect( $context['home'] );
    //     exit;
    // }
    
    // $context['manager'] = $manager_post[0];
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
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => $context['version'],
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


/**
 * IMPLANTATIONS PAGE
 */
if($type_de_page == 'implantations'){
    $page_name = 'implantations';

    $args = array(
        'parent' => $timber_post->ID,
    );
    $branches_pages = get_pages($args);

    $branches_pages = array_map(function($branch){
        $branch_content = get_field('branch', $branch);
        return array(
            'title' => $branch->post_title,
            'permalink' => get_the_permalink($branch),
            'country' => get_the_terms($branch_content, 'pays')[0]->slug,
            'branch' => new Timber\Post($branch_content),
        );
    }, $branches_pages);

    // Sort branches by title
    usort($branches_pages, function($a, $b){
        return strcmp($a['title'], $b['title']);
    });

    $context['branches_pages'] = $branches_pages;
}


/**
 * PAGE BRANCHE
 */
if($type_de_page == 'branche'){
    $page_name = 'single-branch';

    // Get the branch
    $branch = get_field('branch', $timber_post->ID);
    
    // Set $branch as Post object
    if($branch){
        $branch = new Timber\Post($branch);
        $context['branch'] = $branch;

         // Hero
        $hero_section = array(
            'page_title' => 'Private Wealth Management',
            'catch_phrase_part_1' => __('Notre implantation', 'bemy'),
            'catch_phrase_part_2' => __('à', 'bemy') . ' ' . get_the_title(),
        );
        $context['hero_section'] = $hero_section;



        $args = array(
            'parent' => get_post_parent($timber_post->ID)->ID,
            'exclude' => $timber_post->ID,
        );
        $other_branches = get_pages($args);

        // Sort branches by title
        usort($other_branches, function($a, $b){
            return strcmp($a->post_title, $b->post_title);
        });
        
        // Create an array of each branch with the permalink and the post object contained in the field "branch"
        $other_branches = array_map(function($branch){
            $branch_content = get_field('branch', $branch);
            return array(
                'title' => $branch->post_title,
                'permalink' => get_the_permalink($branch),
                'branch' => new Timber\Post($branch_content),
            );
        }, $other_branches);

        $context['other_branches'] = $other_branches;

    }
}

/**
 * CONTACT PAGE
 */
if($type_de_page == 'contact'){
    $page_name = 'contact';

    $context['hero_light'] = true;

    // Get the contact form
    $context['contact_form'] = get_field('form', $timber_post->ID);
}


/**
 * INITIATIVES
 */
if($type_de_page == 'initiatives'){
    $page_name = 'initiatives';

    $page_initiatives = get_posts(array(
        'post_type' => 'page',
        'posts_per_page' => 1,
        'tax_query' => array(
            array(
                'taxonomy' => 'type-de-page',
                'field' => 'slug',
                'terms' => 'initiatives',
            ),
            array(
                'taxonomy' => 'version',
                'field' => 'slug',
                'terms' => $context['version'],
            ),
        ),
    ));
    
    if ($page_initiatives){
        $context['page_initiatives'] = get_the_permalink(pll_get_post($page_initiatives[0]->ID));
    } else {
        $context['page_initiatives'] = $context['home'];
    }

    // Single initiative
    if(isset($_GET['initiative-name'])){
        $initiative = $_GET['initiative-name'];
        $initiative = sanitize_text_field( $initiative );
    
        if(!$initiative){
            wp_redirect( $context['home'] );
            exit;
        }
    
        $args = array(
            'post_type' => 'initiative',
            'name' => $initiative,
        );
        $initiative_post = Timber::get_posts( $args );
    
    
        if(!$initiative_post) {
            wp_redirect( $context['home'] );
            exit;
        }
        
        $page_name = 'single-initiative';
        $context['post'] = $initiative_post[0];
        
        // Get field "initiatives" from the current page to get the selected initiatives
        $other_initiatives_ids = get_field('initiatives', $timber_post->ID);
        if($other_initiatives_ids){
            $other_initiatives_ids = array_map(function($initiative){
                return $initiative['initiative']->ID;
            }, $other_initiatives_ids);
        }
        // Remove current initiative from the list
        $other_initiatives_ids = array_diff($other_initiatives_ids, array($initiative_post[0]->ID));


        // Other initiatives
        $args = array(
            'post_type' => 'initiative',
            'posts_per_page' => -1,
            // 'post__not_in' => array($initiative_post[0]->ID),
            'post__in' => $other_initiatives_ids,
            'orderby' => 'menu_order',
            'order' => 'ASC',
        );
        $other_initiatives = Timber::get_posts( $args );
        if(!empty($other_initiatives)){
            $context['other_initiatives'] = $other_initiatives;
        }
    }

    
}


Timber::render( array( 'pages/page-' . $page_name . '.twig', 'pages/page.twig' ), $context );