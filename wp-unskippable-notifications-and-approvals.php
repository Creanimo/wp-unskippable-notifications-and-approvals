<?php
/**
* Plugin Name: Unskippable Notifications & Approvals
* Plugin URI: https://www.creanimo.net
* Description: Force the confirmation of messages and approvals.
* Version: 0.1
* Author: Ferdinand Engländer
* Author URI: https://www.creanimo.net
**/

/**
 * Set up a menu entry for the settings
 */
function unskippable_notifications_settings_page() {
    add_options_page(
        __( 'Unskippable Notifications', 'unskippable-notifications' ),
        __( 'Unskippable Notifications', 'unskippable-notifications' ),
        'manage_options',
        'unskippable_notifications',
        'unskippable_notifications_settings_page_html'
    );
}

add_action( 'admin_menu', 'unskippable_notifications_settings_page' );

/**
 * Load html into settings page - javascript puts react interface into this placeholder
 */
function unskippable_notifications_settings_page_html() {
    printf(
        '<div class="wrap" id="unskippable-notifications-settings">%s</div>',
        esc_html__( 'Loading…', 'unskippable-notifications' )
    );
}

/**
 * Enqueue scripts for the settings page
 */
function unskippable_notifications_settings_page_enqueue_style_script( $admin_page ) {
    if ( 'settings_page_unskippable_notifications' !== $admin_page ) {
        return;
    }

    $asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    if ( ! file_exists( $asset_file ) ) {
        return;
    }

    $asset = include $asset_file;

    // JS for building the react GUI
    wp_enqueue_script(
        'unskippable-notifications-script',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset['dependencies'],
        $asset['version'],
        array(
            'in_footer' => true,
        )
    );

    // CSS Style for Wordpress Components
    wp_enqueue_style( 'wp-components' );
}

add_action( 'admin_enqueue_scripts', 'unskippable_notifications_settings_page_enqueue_style_script' );