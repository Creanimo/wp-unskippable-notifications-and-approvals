<?php
function unskippable_notifications_frontend_enqueue_style_script()
{
    if (is_admin()) {
        // We are in the admin area, return without doing anything
        return;
    }

    $asset_file = plugin_dir_path(__FILE__) . '../build/frontend.asset.php';

    if (!file_exists($asset_file)) {
        return;
    }

    $asset = include $asset_file;

    // JS for building the react GUI
    wp_enqueue_script(
        'unskippable-notifications-frontend-script',
        plugins_url('../build/frontend.js', __FILE__),
        $asset['dependencies'],
        $asset['version'],
        true // in_footer
    );

    wp_enqueue_style( 'main_css', plugins_url('../build/frontend-style.css', __FILE__) );

    // Localize the script with new data
    wp_localize_script('unskippable-notifications-frontend-script', 'notificationData', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wp_rest'),
    ));
}

add_action('init', 'unskippable_notifications_frontend_enqueue_style_script');