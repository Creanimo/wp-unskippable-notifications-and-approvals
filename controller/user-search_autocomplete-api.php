<?php

/**
 * API to fetch user by name for autocomplete search field
 */
add_action('rest_api_init', function () {
    register_rest_route('unskippable-notif/v1', '/search-users/', array(
        'methods' => 'GET',
        'callback' => 'search_users_by_name_api',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
});

function search_users_by_name_api($request) {
    global $wpdb;
    $search_term = $request->get_param('search');
    $like = '%' . $wpdb->esc_like($search_term) . '%';

    // Prepare the SQL query
    $sql = $wpdb->prepare("
        SELECT DISTINCT u.ID, u.user_login, u.user_nicename, u.user_email, u.user_url, u.display_name,
               um1.meta_value as first_name, um2.meta_value as last_name
        FROM {$wpdb->users} u
        LEFT JOIN {$wpdb->usermeta} um1 ON (u.ID = um1.user_id AND um1.meta_key = 'first_name')
        LEFT JOIN {$wpdb->usermeta} um2 ON (u.ID = um2.user_id AND um2.meta_key = 'last_name')
        WHERE (um1.meta_value LIKE %s OR um2.meta_value LIKE %s)
    ", $like, $like);

    // Execute the query
    $users = $wpdb->get_results($sql);

    /*
    // Check for results
    if (empty($users)) {
        return new WP_Error('no_users', 'No users found', array('status' => 404));
    }*/

    // Prepare the response
    $response = array_map(function ($user) {
        return array(
            'id' => $user->ID,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'display_name' => $user->display_name,
        );
    }, $users);

    // Return the response in JSON format
    return rest_ensure_response($response);
}
