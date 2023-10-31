<?php

function bemy_set_images() {
    // see https://developer.wordpress.org/reference/functions/add_image_size/
    // add_image_size( 'hero-1x', 1440, 450, true );
}

add_action( 'after_setup_theme', 'bemy_set_images' );