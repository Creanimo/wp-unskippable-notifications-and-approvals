import { useState } from '@wordpress/element';

/**
 * Define settings, set their defaults and create the setter functions
 * @returns {Object} all settings for this plugin
 */
export const useSettings = () => {
    const [frontendDisplay, setFrontendDisplay] = useState(true);
    const [defaultDuration, setDefaultDuration] = useState(60);

    return {
        frontendDisplay,
        setFrontendDisplay,
        defaultDuration,
        setDefaultDuration
    };
};