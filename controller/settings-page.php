<?php

require_once(plugin_dir_path(__FILE__) . "../view/container-settings-page.php");

/**
 * Set up a menu entry for the settings and load react container
 */
function unskippable_notifications_settings_page()
{
    add_submenu_page(
        'edit.php?post_type=unskippable_notif',
        __('Unskippable Notifications', 'unskippable-notifications'),
        __('Settings', 'unskippable-notifications'),
        'edit_posts',
        'unskippable_notifications',
        'unskippable_notifications_settings_page_html'
    );
}

add_action('admin_menu', 'unskippable_notifications_settings_page');

/**
 * Enqueue scripts for the settings page react interface
 */
function unskippable_notifications_settings_page_enqueue_style_script() {
    $screen = get_current_screen();

    // Check if we're on the new, edit, or settings page of the custom post type
    if ( !in_array( $screen->id, array( 'unskippable_notif', 'edit-unskippable_notif', 'unskippable_notif_page_unskippable_notifications' ) ) ) {
        return;
    }

    $asset_file = plugin_dir_path(__FILE__) . '../build/index.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    // JS for building the react GUI
    wp_enqueue_script(
        'unskippable-notifications-script',
        plugins_url('../build/index.js', __FILE__),
        $asset['dependencies'],
        $asset['version'],
        true // in_footer
    );

    // CSS Style for Wordpress Components
    wp_enqueue_style('wp-components');
}

add_action('admin_enqueue_scripts', 'unskippable_notifications_settings_page_enqueue_style_script');

function enqueue_my_custom_script() {
    wp_enqueue_script('my-custom-script', 'path-to-your-js-file.js', array('wp-api'));
    wp_localize_script('my-custom-script', 'wpApiSettings', array(
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_my_custom_script');