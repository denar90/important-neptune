import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/Layout';
import withPrefix from '../utils/withPrefix';

export default function Page(props) {
    const page = _.get(props, 'page');
    const config = _.get(props, 'config');
    const title = _.get(page, 'title');
    const subtitle = _.get(page, 'subtitle');
    const image = _.get(page, 'image');
    const imageAlt = _.get(page, 'image_alt');
    const content = _.get(page, 'content');

    return (
        <Layout page={page} config={config}>
            <div className="outer">
                <div className="inner-medium">
                    <article className="post post-full">
                        <header className="post-header">
                            <h1 className="post-title">{title}</h1>
                            {subtitle && <div className="post-subtitle">{subtitle}</div>}
                        </header>
                        {image && (
                            <div className="post-image">
                                <img src={withPrefix(image)} alt={imageAlt} />
                            </div>
                        )}
                        {content && (
                            <div className="post-content">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </Layout>
    );
}
