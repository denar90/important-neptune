import React from 'react';
import _ from 'lodash';

import BlogPostFooter from './BlogPostFooter';
import Link from '../utils/link';
import withPrefix from '../utils/withPrefix';
import getPostUrl from '../utils/getPostUrl';

export default function SectionPosts(props) {
    const section = _.get(props, 'section');
    const posts = _.orderBy(_.get(props, 'posts', []), 'date', 'desc');
    const recentPosts = posts.slice(0, 3);
    const sectionId = _.get(section, 'section_id');
    const background = _.get(section, 'background', 'gray');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');

    return (
        <section id={sectionId} className={`block posts-block bg-${background} outer`}>
            <div className="block-header inner-small">
                {title && <h2 className="block-title">{title}</h2>}
                {subtitle && <p className="block-subtitle">{subtitle}</p>}
            </div>
            <div className="inner">
                <div className="grid post-feed">
                    {_.map(recentPosts, (post, index) => (
                        <RecentPost key={index} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function RecentPost(post) {
    const title = _.get(post, 'title');
    const postUrl = getPostUrl(post, { withPrefix: true });
    const thumbImage = _.get(post, 'thumb_image');
    const thumbImageAlt = _.get(post, 'thumb_image_alt');
    const excerpt = _.get(post, 'excerpt');

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
                        <h3 className="post-title">
                            <Link href={postUrl}>{title}</Link>
                        </h3>
                    </header>
                    <div className="post-excerpt">
                        <p>{excerpt}</p>
                    </div>
                    <BlogPostFooter post={post} dateType={'short'} />
                </div>
            </div>
        </article>
    );
}
