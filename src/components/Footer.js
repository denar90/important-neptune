import React from 'react';
import _ from 'lodash';

import ActionLink from './ActionLink';
import FooterForm from './FooterForm';
import FooterText from './FooterText';
import FooterNav from './FooterNav';

const footerSectionsMap = {
    footer_text: FooterText,
    footer_nav: FooterNav,
    footer_form: FooterForm
};

export default function Footer(props) {
    const config = _.get(props, 'config');
    const footer = _.get(config, 'footer');
    const footerSections = _.get(footer, 'sections');
    const hideNavLinks = _.get(footer, 'hide_nav_links');
    const navLinks = _.get(footer, 'nav_links');
    const footerContent = _.get(footer, 'content');
    const links = _.get(footer, 'links');

    return (
        <footer id="colophon" className="site-footer">
            {!_.isEmpty(footerSections) && (
                <div className="footer-top outer">
                    <div className="inner">
                        <div className="grid footer-widgets">
                            {_.map(footerSections, (section, idx) => {
                                const sectionType = _.get(section, '__metadata.modelName');
                                if (!sectionType) {
                                    throw new Error('footer section does not have the "type" property');
                                }
                                const Component = footerSectionsMap[sectionType];
                                if (!Component) {
                                    throw new Error(`no component matching the footer section's type: ${sectionType}`);
                                }
                                return <Component key={idx} section={section} />;
                            })}
                        </div>
                    </div>
                </div>
            )}
            <div className="footer-bottom outer">
                <div className="inner">
                    {!hideNavLinks && !_.isEmpty(navLinks) && (
                        <div className="footer-nav">
                            <ul className="menu">
                                {_.map(navLinks, (action, actionIdx) => (
                                    <li key={actionIdx} className="menu-item">
                                        <ActionLink action={action} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="site-info">
                        <div dangerouslySetInnerHTML={{ __html: footerContent }} />
                        &nbsp;
                        {_.map(links, (action, actionIdx) => (
                            <ActionLink key={actionIdx} action={action} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
