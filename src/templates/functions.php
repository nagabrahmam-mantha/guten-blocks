<?php
add_action('init', function() {

  $script_asset = require( get_stylesheet_directory() . '/assets/gutenberg/block-big-sampleblock.asset.php' );

	wp_register_script('block-big-sampleblock-js', get_stylesheet_directory_uri() . '/assets/gutenberg/block-big-sampleblock.js', $script_asset['dependencies'], $script_asset['version'] );

	register_block_type('big/sampleblock', [
		'editor_script' => 'block-big-sampleblock-js',
	]);
});
?>
