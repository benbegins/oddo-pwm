<?php
    function bemy_create_post_types() {
        // see https://developer.wordpress.org/reference/functions/register_post_type/
        // register_post_type(
        //     'company',
        //     array(
        //         'labels'            => array(
        //             'name'              => __( 'Entreprises' ),
        //             'singular_name'     => __( 'Entreprise' )
        //         ),
        //         'public' => false,
        //         'show_in_menu' => true,
        //         'show_in_rest' => true,
        //         'show_ui' => true,
        //         'menu_position' => 22,
        //         'menu_icon' => 'dashicons-building',
        //         'has_archive' => false,
        //         'rewrite' => false
        //     ));
    }
    add_action( 'init', 'bemy_create_post_types' );
