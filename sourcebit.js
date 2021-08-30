const _ = require('lodash');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-contentful'),
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                deliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
                previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
                preview: isDev,
                watch: isDev,
                pollingInterval: 2000
            }
        },
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                pages: (data) => {
                    const pages = _.filter(data, (item) => ['landing', 'page', 'blog', 'post'].includes(_.get(item, '__metadata.modelName')));
                    // Only the "blog" page and the "landing" page with "section_posts" section needs a list of posts with specific post properties.
                    // We want to optimize the first page load and ensure that only the needed data is fetched.
                    const posts = _.filter(data, _.matchesProperty('__metadata.modelName', 'post')).map((post) => _.pick(post, [
                        'title',
                        'thumb_image',
                        'thumb_image_alt',
                        'excerpt',
                        'date',
                        'author',
                        'slug'
                    ]));
                    return _.map(pages, (page) => {
                        const pageType = _.get(page, '__metadata.modelName');
                        const isBlogPage = pageType === 'post';
                        const isBlogIndexPage = pageType === 'blog';
                        const isLandingPageWithPostsSection = pageType === 'landing' && _.some(_.get(page, 'sections'), ['__metadata.modelName', 'section_posts']);
                        const needsPosts = isBlogIndexPage || isLandingPageWithPostsSection;
                        const slug = _.trim(page.slug, '/');
                        page.urlPath = isBlogPage ? `blog/${slug}` : slug;
                        return {
                            path: page.urlPath,
                            page: page,
                            ...(needsPosts ? { posts: posts } : {})
                        };
                    });
                },
                commonProps: (data) => {
                    const config = _.find(data, _.matchesProperty('__metadata.modelName', 'config'));
                    return { config };
                }
            }
        }
    ]
};
