<?php
    function bemy_create_taxonomies() {
        // see https://developer.wordpress.org/reference/functions/register_taxonomy/
        // register_taxonomy(
        //     'product_category',
        //     'product',
        //     array(
        //         'label'     => 	__( 'Catégories' ),
        //         // 'public'    => false,
        //     ));
    }
    add_action( 'init', 'bemy_create_taxonomies' );