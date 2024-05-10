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
function unskippable_notifications_settings_page_enqueue_style_script($admin_page)
{
    if ('unskippable_notif_page_unskippable_notifications' !== $admin_page) {
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
        array(
            'in_footer' => true,
        )
    );

    // CSS Style for Wordpress Components
    wp_enqueue_style('wp-components');
}

add_action('admin_enqueue_scripts', 'unskippable_notifications_settings_page_enqueue_style_script');