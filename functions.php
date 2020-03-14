<?php

function theme_webpack_wordpress_scripts() {
    wp_enqueue_style( 'theme-webpack-wordpress-style', get_stylesheet_uri() );
    wp_enqueue_script( 'theme-webpack-wordpress-js', get_template_directory_uri() . '/assets/dist/app.min.js', array(), rand(1, 9999), true );
}
add_action( 'wp_enqueue_scripts', 'theme_webpack_wordpress_scripts' );
