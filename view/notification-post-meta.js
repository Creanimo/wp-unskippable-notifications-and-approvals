import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { SelectControl } from "@wordpress/components";

const animatedComponents = makeAnimated();

// Reusable search field component
function SearchField({
    searchPath,
    placeholderText,
    noOptionsText,
    formatOptionLabel,
    maxResults,
    initialData,
    onSave,
}) {
    // Initialize with initialData if it's an array, otherwise default to an empty array
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch options and format them for the Select component
    const fetchOptions = (inputValue = '') => {
        setIsLoading(true);
        apiFetch({
            path: searchPath(inputValue),
            method: 'GET',
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            }
        }).then((results) => {
            const limitedResults = typeof maxResults === 'number' ? results.slice(0, maxResults) : results;
            const formattedOptions = limitedResults.map((item) => ({
                value: item.id,
                label: formatOptionLabel(item)
            }));
            setOptions(formattedOptions);
            setIsLoading(false);
        });
    };


    // Effect to set initial selected options
    useEffect(() => {
        if (Array.isArray(initialData)) {
            setSelectedOptions(initialData);
        }
    }, [initialData]);

    // Handlers for Select component
    const handleInputChange = (inputValue) => {
        fetchOptions(inputValue);
    };

    const handleFocus = () => {
        if (options.length === 0) {
            fetchOptions();
        }
    };

    const handleChange = (newSelectedOptions) => {
        setSelectedOptions(newSelectedOptions);
        if (onSave) {
            onSave(newSelectedOptions);
        }
    };

    // Effect hook to call onSave when selectedOptions change
    useEffect(() => {
        if (onSave) {
            onSave(selectedOptions);
        }
    }, [selectedOptions, onSave]);

    return (
        <Select
            components={animatedComponents}
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            onInputChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={placeholderText}
            noOptionsMessage={() => noOptionsText}
            isLoading={isLoading}
        />
    );
}

function fetchNotificationTypes() {
    let notificationTypes = [];
    for (const [key, value] of Object.entries(unskippableNotifData.customFieldData.notificationTypes)) {
        let notificationType = {label: value, value: key};
        notificationTypes.push(notificationType)
    }
    return notificationTypes;
}


// Example usage in App component
function App() {
    const formatUserLabel = (user) => `${user.first_name} ${user.last_name} (${user.user_email})`;
    const formatRoleLabel = (role) => role.role_name;
    const initialUsersData = unskippableNotifData.customFieldData.users;
    const initialRolesData = unskippableNotifData.customFieldData.roles;
    const maxUserResults = 10;
    const maxRoleResults = 10;
    console.log('unskippableNotifData:', unskippableNotifData);
    console.log('initialUsersData:', initialUsersData);
    console.log('initialRolesData:', initialRolesData);

    const handleSave = (selectedOptions, metaKey) => {
        const post_id = wp.data.select('core/editor').getCurrentPostId(); // Get the current post ID

        apiFetch({
            path: `/unskippable-notif/v1/save-meta/${metaKey}`,
            method: 'POST',
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: post_id,
                selectedOptions: selectedOptions,
            }),
        }).catch(error => {
            console.error('Error saving data:', error);
        });
    };

    return (
        <>
            <h3>{__("Notify user(s):", 'unskippable-notifications')}</h3>
            <SearchField
                searchPath={(inputValue) => `/unskippable-notif/v1/search-users/?search=${inputValue}`}
                placeholderText={__("Type a user's name", 'unskippable-notifications')}
                noOptionsText={__('No user(s) found.', 'unskippable-notifications')}
                formatOptionLabel={formatUserLabel}
                maxResults={maxUserResults}
                initialData={initialUsersData} // Pass initial data for users
                onSave={(selectedOptions) => handleSave(selectedOptions, 'notify_users_field')} // Pass save callback
            />
            <h3>{__("Search role(s):", 'unskippable-notifications')}</h3>
            <SearchField
                searchPath={(inputValue) => `/unskippable-notif/v1/search-roles/?search=${inputValue}`}
                placeholderText={__("Type a role's name", 'unskippable-notifications')}
                noOptionsMessage={__('No role(s) found.', 'unskippable-notifications')}
                formatOptionLabel={formatRoleLabel}
                maxResults={maxRoleResults}
                initialData={initialRolesData} // Pass initial data for roles
                onSave={(selectedOptions) => handleSave(selectedOptions, 'notify_roles_field')} // Pass save callback
            />
            <SelectControl
                onBlur={function noRefCheck() { }}
                onChange={function noRefCheck() { }}
                onFocus={function noRefCheck() { }}
                options={fetchNotificationTypes()}
            />
        </>
    );
}

domReady(() => {
    const container = document.getElementById('unskippable-notif_edit-sidebar');
    const root = createRoot(container);
    root.render(<App />);
});



domReady(() => {
    const container = document.getElementById('unskippable-notif_edit-sidebar');
    const root = createRoot(container);
    root.render(<App />);
});