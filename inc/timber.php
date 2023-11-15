<?php

$timber = new Timber\Timber();


/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class BemySite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		parent::__construct();
	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['options'] = get_fields('options');
		return $context;
	}



	public function hash_to_tags($value) {
		$pattern = '/#(.+?)#/is';
		$replacement = '<strong>${1}</strong>';
		return preg_replace($pattern, $replacement, $value);
	}


    function hash_to_link($value, $link, $class_name) {
        $pattern = '/#(.+?)#/is';
        $replacement = '<a href="' . $link . '" class="' . $class_name . '" target="_blank">${1}</a>';
        return preg_replace($pattern, $replacement, $value);
    }

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'hash_to_tags', array( $this, 'hash_to_tags' ) ) );
		$twig->addFilter( new Twig\TwigFilter( 'hash_to_link', array( $this, 'hash_to_link' ) ) );
		return $twig;
	}
}

new BemySite();