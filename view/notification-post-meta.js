import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const animatedComponents = makeAnimated();

// Reusable search field component
function SearchField({ searchPath, placeholderText, noOptionsText, formatOptionLabel, maxResults }) {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOptions = (inputValue = '') => {
        setIsLoading(true);
        apiFetch({
            path: searchPath(inputValue),
            method: 'GET',
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            }
        }).then((results) => {
            // Limit the number of results if maxResults is defined
            const limitedResults = typeof maxResults === 'number' ? results.slice(0, maxResults) : results;
            const formattedOptions = limitedResults.map((item) => ({
                value: item.id,
                label: formatOptionLabel(item)
            }));
            setOptions(formattedOptions);
            setIsLoading(false);
        });
    };

    const handleInputChange = (inputValue) => {
        fetchOptions(inputValue);
    };

    const handleFocus = () => {
        if (options.length === 0) {
            fetchOptions(); // Fetch all options when the field is focused
        }
    };

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    return (
        <>
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
        </>
    );
}


// Example usage in App component
function App() {
    const formatUserLabel = (user) => `${user.first_name} ${user.last_name} (${user.display_name})`;
    const formatRoleLabel = (role) => role.role_name;
    const maxUserResults = 10;
    const maxRoleResults = 10;

    return (
        <>
            <h3>{__("Notify user(s):", 'unskippable-notifications')}</h3>
            <SearchField
                searchPath={(inputValue) => `/unskippable-notif/v1/search-users/?search=${inputValue}`}
                placeholderText={__("Type a user's name", 'unskippable-notifications')}
                noOptionsText={__('No user(s) found.', 'unskippable-notifications')}
                formatOptionLabel={formatUserLabel}
                maxResults={maxUserResults}
            />
            <h3>{__("Search role(s):", 'unskippable-notifications')}</h3>
            <SearchField
                searchPath={(inputValue) => `/unskippable-notif/v1/search-roles/?search=${inputValue}`}
                placeholderText={__("Type a role's name", 'unskippable-notifications')}
                noOptionsText={__('No role(s) found.', 'unskippable-notifications')}
                formatOptionLabel={formatRoleLabel}
                maxResults={maxRoleResults}
            />
        </>
    );
}


domReady(() => {
    const container = document.getElementById('unskippable-notif_edit-sidebar');
    const root = createRoot(container);
    root.render(<App />);
});