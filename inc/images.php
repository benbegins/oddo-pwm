<?php

function bemy_set_images() {
    // see https://developer.wordpress.org/reference/functions/add_image_size/
    // add_image_size( 'xl', 1440, 1000, false );
}

add_action( 'after_setup_theme', 'bemy_set_images' );