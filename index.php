<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>
        <title></title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
    <div id="primary" class="content-area">
		<main id="main" class="site-main">
            Mario
        <?php echo get_template_directory(); ?>
        <?php wp_nav_menu(); ?>

		</main><!-- #main -->
	</div><!-- #primary -->
    </body>
    <?php wp_footer(); ?>
</html>