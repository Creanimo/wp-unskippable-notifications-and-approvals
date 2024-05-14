<?php

add_action('rest_api_init', function () {
    register_rest_route('unskippable-notif/v1', '/search-roles/', array(
        'methods' => 'GET',
        'callback' => 'search_roles_by_name_api',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));
});

function search_roles_by_name_api($request) {
    global $wp_roles;
    if ( ! isset( $wp_roles ) ) {
        $wp_roles = new WP_Roles();
    }
    $all_roles = $wp_roles->get_names(); // Retrieve all roles
    $search_term = strtolower($request->get_param('search'));

    // Filter roles based on search term
    $matching_roles = array_filter($all_roles, function ($role_name) use ($search_term) {
        return false !== strpos(strtolower($role_name), $search_term);
    });

    // Prepare the response
    $response = array();
    foreach ($matching_roles as $role_key => $role_name) {
        $response[] = array(
            'role_key' => $role_key,
            'role_name' => $role_name
        );
    }

    // Return the response in JSON format
    return rest_ensure_response($response);
};
