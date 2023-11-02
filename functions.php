<?php

// Load Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';

require get_template_directory() . '/inc/timber.php';

require get_template_directory() . '/inc/setup.php';
// IMPORTANT : Declarer les taxonomies avant les post-types
require get_template_directory() . '/inc/taxonomies.php';

require get_template_directory() . '/inc/post-types.php';

require get_template_directory() . '/inc/images.php';

require get_template_directory() . '/inc/menus.php';

require get_template_directory() . '/inc/enqueue.php';

require get_template_directory() . '/inc/option-page.php';

require get_template_directory() . '/inc/api.php';

require get_template_directory() . '/inc/admin.php';

require get_template_directory() . '/inc/roles.php';

require get_template_directory() . '/inc/last_login.php';

require get_template_directory() . '/inc/utils.php';

flush_rewrite_rules();

?>
