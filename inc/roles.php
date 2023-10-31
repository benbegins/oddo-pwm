<?php

function create_viewer_role() {
    // inspired from https://developer.wordpress.org/reference/functions/add_role/#user-contributed-notes
    // if ( get_option( 'custom_roles_version' ) < 1 ) {
    //     add_role( 'viewer', 'Lecteur/Lectrice', array(
    //         'read' => true,
    //         'read_private_pages' => true,
    //         'read_private_posts' => true
    //     ));
    //     update_option( 'custom_roles_version', 1 );
    // }
}
add_action( 'init', 'create_viewer_role' );