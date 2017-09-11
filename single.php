<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package playground
 */

get_header(); ?>

		<?php
		while ( have_posts() ) : the_post();
			the_title();
			the_content();

		endwhile; // End of the loop.
		?>

<?php
get_footer();
