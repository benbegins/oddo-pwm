<?php

if ( ! function_exists( 'bemy_setup' ) ) {
    function bemy_setup() {

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
				'navigation-widgets',
			)
		);

		/*
		 * Let wordpress handle title-tag handling
		 */
		add_theme_support( 'title-tag' );


        /**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
        // $logo_width  = 223;
        // $logo_height = 90;

        add_theme_support(
            'custom-logo',
            array(
                // 'height'               => $logo_height,
                // 'width'                => $logo_width,
                'flex-width'           => true,
                'flex-height'          => true,
                'unlink-homepage-logo' => false,
            )
		);

		/**
		 * Diable gutenberg
		 */

		add_filter('use_block_editor_for_post', '__return_false', 10);


    }
}

add_action( 'after_setup_theme', 'bemy_setup' );
