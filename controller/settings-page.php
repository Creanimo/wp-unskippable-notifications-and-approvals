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
function unskippable_notifications_settings_page_enqueue_style_script()
{
    $screen = get_current_screen();

    // Check if we're on the new, edit, or settings page of the custom post type
    if (!in_array($screen->id, array('unskippable_notif', 'edit-unskippable_notif', 'unskippable_notif_page_unskippable_notifications'))) {
        return;
    }

    $asset_file = plugin_dir_path(__FILE__) . '../build/admin.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    // JS for building the react GUI
    wp_enqueue_script(
        'unskippable-notifications-script',
        plugins_url('../build/admin.js', __FILE__),
        $asset['dependencies'],
        $asset['version'],
        true // in_footer
    );

    // Localize the script with your data
    $post_id = get_the_ID();
    if ($post_id) {
        $users_data = get_post_meta($post_id, 'notify_users_field', true);
        $roles_data = get_post_meta($post_id, 'notify_roles_field', true);
        wp_localize_script('unskippable-notifications-script', 'unskippableNotifData', [
            'customFieldData' => [
                'users' => $users_data,
                'roles' => $roles_data,
            ],
        ]);
    }

    

    // CSS Style for Wordpress Components
    wp_enqueue_style('wp-components');
}
add_action('admin_enqueue_scripts', 'unskippable_notifications_settings_page_enqueue_style_script');
