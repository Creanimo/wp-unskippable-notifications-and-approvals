import { createRoot } from 'react-dom/client';
import domReady from '@wordpress/dom-ready';
import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const animatedComponents = makeAnimated();

function UserTokenField() {
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (inputValue) => {
        apiFetch({
            path: `/unskippable-notif/v1/search-users/?search=${inputValue}`,
            method: 'GET',
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            }
        }).then((results) => {
            const formattedOptions = results.map((user) => ({
                value: user.id,
                label: `${user.first_name} ${user.last_name} (${user.display_name})`
            }));
            setOptions(formattedOptions);
        });
    };

    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    return (
        <>
            <h3>Notify user(s):</h3>
            <Select
            components={animatedComponents}
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            onInputChange={handleInputChange}
            placeholder= {__("Type a user's name", 'unskippable-notifications')}
            noOptionsMessage={() =>  {__('No user(s) found.', 'unskippable-notifications')}}
            isLoading={options.length === 0}
        />
        </>
    );
}

export default UserTokenField;

domReady(() => {

    const container = document.getElementById('unskippable-notif_edit-sidebar');

    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<UserTokenField />);
});