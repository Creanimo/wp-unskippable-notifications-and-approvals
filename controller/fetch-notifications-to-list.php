<?php
add_action('rest_api_init', function () {
    register_rest_route('unskippable-notif/v1', '/notifications/', array(
        'methods' => 'GET',
        'callback' => 'fetch_notifications_rest_api',
        'permission_callback' => function () {
            // Temporarily return true for debugging
            return true;
        }
    ));
});

function fetch_notifications_rest_api(WP_REST_Request $request) {
    $current_user_id = get_current_user_id();
    $current_user_roles = wp_get_current_user()->roles;
    $notifications = get_transient('unskippable_notif_data_who_to_notify');

    if (!$notifications) {
        return new WP_Error('no_notifications', 'No notifications found', array('status' => 404));
    }

    $allowed_notifications = array();

    foreach ($notifications as $post_id => $data) {
        if (in_array($current_user_id, $data['users']) || array_intersect($current_user_roles, $data['roles'])) {
            $post = get_post($post_id);
            if ($post) {
                $allowed_notifications[] = array(
                    'title' => $post->post_title,
                    'content' => $post->post_content,
                );
            }
        }
    }

    if (empty($allowed_notifications)) {
        return new WP_Error('no_allowed_notifications', 'No allowed notifications', array('status' => 404));
    }

    return rest_ensure_response($allowed_notifications);
}