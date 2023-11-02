<?php

/**
 *  Remove comments and articles from admin menu
*/  
function post_remove (){ 
    remove_menu_page( 'edit-comments.php' );
    remove_menu_page( 'edit.php' );
}
add_action('admin_menu', 'post_remove'); 