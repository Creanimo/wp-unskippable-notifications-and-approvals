import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TabPanel, Panel, PanelBody, PanelRow, Button, ToggleControl, BaseControl } from '@wordpress/components';
import {
    __experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
    __experimentalView as View,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * Define settings, set their defaults and greate the setter functions
 * @returns {Array} all settings for this plugin
 */
const useSettings = () => {
    const [frontendDisplay, setFrontendDisplay] = useState(true);
    const [defaultDuration, setDefaultDuration] = useState(60);

    return {
        frontendDisplay,
        setFrontendDisplay,
        defaultDuration,
        setDefaultDuration
    };
};

/**
 * Save Button
 * @param {Event} onClick
 * @returns {Button}
 */
const SaveButton = ({ onClick }) => {
    return (
        <Button variant="primary" onClick={onClick} __next40pxDefaultSize>
            {__('Save', 'unskippable-notifications')}
        </Button>
    );
};

/**
 * Setting - toggle messages in frontend
 * @param {Boolean}
 * @param {Event}
 * @returns 
 */
const FrontendDisplayControl = ({ value, onChange }) => {
    return (
        <ToggleControl
            label={__('show messages in frontend', 'unskippable-notifications')}
            help={__('Temporarily disable forced notifications on frontend site.', 'unskippable-notifications')}
            checked={value}
            onChange={onChange}
            __nextHasNoMarginBottom
        />
    );
};

/**
 * Building the settings page html
 * @returns {string} html DOM of settings page
 */
const SettingsPage = () => {
    const {
        frontendDisplay,
        setFrontendDisplay,
        defaultDuration,
        setDefaultDuration
    } = useSettings();
    const onTabSelect = (tabName) => {
        console.log('Selecting tab', tabName);
    };
    // only one component can be reurned in react, so everything needs to be wrapped in <>...</>
    return (
        <>

            <Spacer><h1>{__('Unskippable Notifications & Approvals', 'unskippable-notifications')}</h1></Spacer>
            <Spacer>
                <TabPanel
                    className="my-tab-panel"
                    activeClass="is-active"
                    onSelect={onTabSelect}
                    tabs={[
                        {
                            name: 'general',
                            title: <>{__('General', 'unskippable-notifications')}</>,
                            className: 'unskippable-notifications-settings__tab--general',
                            content: <>
                                <BaseControl>
                                    <BaseControl.VisualLabel>
                                        {__('Frontend', 'unskippable-notifications')}
                                    </BaseControl.VisualLabel>
                                    <FrontendDisplayControl
                                        value={frontendDisplay}
                                        onChange={(value) => setFrontendDisplay(value)}
                                    />
                                </BaseControl>
                                <Spacer>
                                    <NumberControl
                                        label={__('Default Duration', 'unskippable-notifications')}
                                        help={__('For how many days after publication should a new notification be shown by default? Can be changed for every notification during creation.', 'unskippable-notifications')}
                                        value={defaultDuration}
                                        onChange={(value) => setDefaultDuration(value)}
                                    />
                                </Spacer>
                            </>
                        },
                        {
                            name: 'about',
                            title: 'About',
                            className: 'unskippable-notifications-settings__tab--about',
                            content: <p>{__("This plugin is open source. You can join development and find other ways to support this project on", 'unskippable-notificatons')} <a href='https://github.com/Creanimo/wp-unskippable-notifications-and-approvals'>GitHub</a></p>
                        },
                    ]}
                >
                    {({ title, content, className }) => <Panel><PanelBody><div className={className}>{content}</div></PanelBody></Panel>}
                </TabPanel>
            </Spacer>
            <Spacer>
                <SaveButton onClick={() => { }} />
            </Spacer>

        </>
    );
};

/**
 * Renders the html onto the settings page
 */
domReady(() => {
    const root = createRoot(
        document.getElementById('unskippable-notifications-settings')
    );

    root.render(<SettingsPage />);
});