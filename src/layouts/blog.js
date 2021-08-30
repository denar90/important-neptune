import React from 'react';
import _ from 'lodash';

import Layout from '../components/Layout';
import BlogPostFooter from '../components/BlogPostFooter';
import Link from '../utils/link';
import withPrefix from '../utils/withPrefix';
import getPostUrl from '../utils/getPostUrl';

export default function Blog(props) {
    const page = _.get(props, 'page');
    const config = _.get(props, 'config');
    const posts = _.orderBy(_.get(props, 'posts', []), 'date', 'desc');
    return (
        <Layout page={page} config={config}>
            <div className="outer">
                <div className="inner">
                    <div className="grid post-feed">
                        {_.map(posts, (post, index) => (
                            <Post key={index} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function Post(post) {
    const title = _.get(post, 'title');
    const thumbImage = _.get(post, 'thumb_image');
    const thumbImageAlt = _.get(post, 'thumb_image_alt');
    const excerpt = _.get(post, 'excerpt');
    const postUrl = getPostUrl(post, { withPrefix: true });

    return (
        <article className="cell post">
            <div className="card">
                {thumbImage && (
                    <Link className="post-thumbnail" href={postUrl}>
                        <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                    </Link>
                )}
                <div className="post-body">
                    <header className="post-header">
                        <h2 className="post-title">
                            <Link href={postUrl}>{title}</Link>
                        </h2>
                    </header>
                    {excerpt && (
                        <div className="post-excerpt">
                            <p>{excerpt}</p>
                        </div>
                    )}
                    <BlogPostFooter post={post} dateType={'short'} />
                </div>
            </div>
        </article>
    );
}
