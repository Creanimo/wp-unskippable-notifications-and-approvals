<?php
// for storing input to the user select in post edit
function register_notify_users_field_meta() {
    register_post_meta('unskippable_notif', 'notify_users_field', array(
        'show_in_rest' => true,
        'single' => false,
        'type' => 'array',
    ));
}
add_action('init', 'register_notify_users_field_meta');

// for storing input to the user select in post edit
function register_notify_roles_field_meta() {
    register_post_meta('unskippable_notif', 'notify_roles_field', array(
        'show_in_rest' => true,
        'single' => false,
        'type' => 'array',
    ));
}
add_action('init', 'register_notify_roles_field_meta');

// the user can select which type of notification to create
function register_notification_type_field_meta() {
    register_post_meta('unskippable_notif', 'notification_type', array(
        'show_in_rest' => true,
        'single' => false,
        'type' => 'array',
    ));
}

add_action('init', 'register_notification_type_field_meta');

// for the IDs of users who marked as read
function register_read_user_meta() {
    register_post_meta('unskippable_notif', 'read_by_users', array(
        'show_in_rest' => true,
        'single' => false,
        'type' => 'array',
    ));
}
add_action('init', 'register_read_user_meta');