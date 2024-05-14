<?php
/**
 * Javascript puts react interface into this placeholder
 */
function notification_options_meta_box_callback() {
    printf(
        '<div class="wrap" id="unskippable-notif_edit-sidebar">%s</div>',
        esc_html__('Loading…', 'unskippable-notifications')
    );
}

add_action( 'add_meta_boxes', function() {
    add_meta_box(
        'notification_options_meta_box', // ID of the meta box
        __('Notification Options', 'textdomain'), // Title of the meta box
        'notification_options_meta_box_callback', // Callback function
        'unskippable_notif', // Post type
        'side' // Context
    );
} );