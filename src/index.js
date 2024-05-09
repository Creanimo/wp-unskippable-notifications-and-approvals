import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TabPanel, Panel, PanelBody, PanelRow, Button, ToggleControl } from '@wordpress/components';
import {
    __experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
    __experimentalView as View,
} from '@wordpress/components';

/**
 * Define settings, set their defaults and greate the setter functions
 * @returns {Array} all settings for this plugin
 */
const useSettings = () => {
    const [ frontendDisplay, setFrontendDisplay ] = useState(true);
    
    return {
        frontendDisplay,
        setFrontendDisplay,
    };
};

/**
 * Save Button
 * @param {Event} onClick
 * @returns {Button}
 */
const SaveButton = ( { onClick } ) => {
    return (
        <Button variant="primary" onClick={ onClick } __next40pxDefaultSize>
            { __( 'Save', 'unskippable-notifications' ) }
        </Button>
    );
};

/**
 * Setting - toggle messages in frontend
 * @param {Boolean}
 * @param {Event}
 * @returns 
 */
const FrontendDisplayControl = ( { value, onChange } ) => {
    return (
        <ToggleControl
            label={ __( 'show messages in frontend', 'unskippable-notifications' ) }
            checked={ value }
            onChange={ onChange }
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
    } = useSettings();
    const onTabSelect = (tabName) => {
        console.log('Selecting tab', tabName);
    };
    // only one component can be reurned in react, so everything needs to be wrapped in <>...</>
    return (
        <>
            <Panel>
                <PanelBody>
                <Spacer><Heading level = { 1 }>{ __( 'Unskippable Notifications & Approvals', 'unskippable-notifications' ) }</Heading></Spacer>
                <TabPanel
                    className="my-tab-panel"
                    activeClass="is-active"
                    onSelect={onTabSelect}
                    tabs={[
                        {
                            name: 'general',
                            title: <>{ __( 'General Visibility & Scheduling', 'unskippable-notifications' ) }</>,
                            className: 'unskippable-notifications-settings__tab--general',
                            content: <><p>{ __( "These settings apply to all notifications and approval requests.", 'unskippable-notificatons' ) }</p>
                                <FrontendDisplayControl
                                value={ frontendDisplay }
                                onChange={ ( value ) => setFrontendDisplay( value ) }
                            /></>
                        },
                        {
                            name: 'about',
                            title: 'About',
                            className: 'unskippable-notifications-settings__tab--about',
                            content: <p>{ __( "This plugin is open source. You can join development and find other ways to support this project on", 'unskippable-notificatons' ) } <a href='https://github.com/Creanimo/wp-unskippable-notifications-and-approvals'>GitHub</a></p>
                        },
                    ]}
                >
                    {({ title, content, className }) => <Panel><PanelBody><div className={className}>{content}</div></PanelBody></Panel>}
                </TabPanel>
                </PanelBody>
            </Panel>
            <Panel>
                <PanelBody>
                    <SaveButton onClick={ () => {} } />
                </PanelBody>
            </Panel>
        </>
   );
};

/**
 * Renders the html onto the settings page
 */
domReady( () => {
    const root = createRoot(
        document.getElementById( 'unskippable-notifications-settings' )
    );

    root.render( <SettingsPage /> );
} );