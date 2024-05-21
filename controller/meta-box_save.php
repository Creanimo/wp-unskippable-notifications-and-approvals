<?php
add_action('save_post_unskippable_notif', function ($post_id) {
    // Check if our nonce is set and verify the admin session to prevent CSRF.
    // Make sure to enqueue and send this nonce from your JavaScript application.
    if (!isset($_POST['unskippable_notif_nonce']) || !wp_verify_nonce($_POST['unskippable_notif_nonce'], 'save_unskippable_notif')) {
        return;
    }

    // Check for the custom field data sent via POST and sanitize it.
    if (isset($_POST['custom_field_data'])) {
        // Use appropriate sanitization function based on the type of data.
        $custom_field_data = sanitize_text_field($_POST['custom_field_data']);
        update_post_meta($post_id, 'unskippable_notif', $custom_field_data);
    }
});

add_action('rest_api_init', function () {
    register_rest_route('unskippable-notif/v1', '/save-meta/(?P<meta_key>\w+)', array(
        'methods' => 'POST',
        'callback' => 'save_custom_meta',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
        'args' => array(
            'meta_key' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return is_string($param);
                }
            ),
            'selectedOptions' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return (is_array($param) || is_string($param));
                }
            ),
        ),
    ));
});

function save_custom_meta($request) {
    $meta_key = $request['meta_key'];
    $selectedOptions = $request['selectedOptions'];
    $post_id = $request['post_id'];

    // Validate and sanitize input
    /*
    if ((!is_array($selectedOptions) || !is_string($selectedOptions)) || !is_string($meta_key)) {
        return new WP_Error('invalid_data', 'Invalid data provided', array('status' => 400));
    }*/

    // Save the meta field
    update_post_meta($post_id, $meta_key, $selectedOptions);

    return new WP_REST_Response('Meta saved successfully', 200);
}
