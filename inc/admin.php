<?php

/**
 *  Remove comments and articles from admin menu
*/  
function post_remove (){ 
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'edit.php' );
}
add_action('admin_menu', 'post_remove'); 



/**
 *  Remove editor support for pages
*/
function remove_editor() {
  remove_post_type_support('page', 'editor');
}
add_action('admin_init', 'remove_editor');