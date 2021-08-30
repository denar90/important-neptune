import dynamic from 'next/dynamic';
import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

const pageLayoutsMap = {
    landing: dynamic(() => import('../layouts/landing')),
    page: dynamic(() => import('../layouts/page')),
    blog: dynamic(() => import('../layouts/blog')),
    post: dynamic(() => import('../layouts/post'))
};

function Page(props) {
    const modelName = _.get(props, 'page.__metadata.modelName');
    const PageLayout = pageLayoutsMap[modelName];
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    return <PageLayout {...props} />;
}

export async function getStaticPaths() {
    console.log('Page [...slug].js getStaticPaths');
    const paths = await sourcebitDataClient.getStaticPaths();
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    console.log('Page [...slug].js getStaticProps, params: ', params);
    const pagePath = '/' + (params.slug ? params.slug.join('/') : '');
    const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
    return { props };
}

export default withRemoteDataUpdates(Page);
