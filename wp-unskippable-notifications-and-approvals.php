<?php
/**
* Plugin Name: Unskippable Notifications & Approvals
* Plugin URI: https://www.creanimo.net
* Description: Force the confirmation of messages and approvals.
* Version: 0.1
* Author: Ferdinand Engländer
* Author URI: https://www.creanimo.net
**/

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

function unskippable_notifications_settings_page_html() {
    printf(
        '<div class="wrap" id="unskippable-notifications_settings">%s</div>',
        esc_html__( 'Loading…', 'unskippable-notifications' )
    );
}