import dynamic from 'next/dynamic';
import React from 'react';
import _ from 'lodash';

import Layout from '../components/Layout';

const sectionsMap = {
    section_content: dynamic(() => import('../components/SectionContent')),
    section_cta: dynamic(() => import('../components/SectionCta')),
    section_faq: dynamic(() => import('../components/SectionFaq')),
    section_features: dynamic(() => import('../components/SectionFeatures')),
    section_hero: dynamic(() => import('../components/SectionHero')),
    section_posts: dynamic(() => import('../components/SectionPosts')),
    section_pricing: dynamic(() => import('../components/SectionPricing')),
    section_reviews: dynamic(() => import('../components/SectionReviews')),
    section_contact: dynamic(() => import('../components/SectionContact'))
};

export default function Landing(props) {
    const config = _.get(props, 'config');
    const page = _.get(props, 'page');
    const posts = _.get(props, 'posts');
    const sections = _.get(page, 'sections');
    const pageUrlPath = _.get(page, 'urlPath');

    return (
        <Layout page={page} config={config}>
            {_.map(sections, (section, index) => {
                const sectionType = _.get(section, '__metadata.modelName');
                if (!sectionType) {
                    throw new Error(`page section does not have the 'type' property, page: ${pageUrlPath}`);
                }
                const Component = sectionsMap[sectionType];
                if (!Component) {
                    throw new Error(`no component matching the page section's type: ${sectionType}`);
                }
                return <Component key={index} section={section} posts={posts} />;
            })}
        </Layout>
    );
}
