import React from 'react';
import moment from 'moment-strftime';
import _ from 'lodash';

export default function BlogPostFooter(props) {
    const post = _.get(props, 'post');
    const dateType = _.get(props, 'dateType');
    const date = _.get(post, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate = dateType === 'short' ? moment(date).strftime('%B %d, %Y') : moment(date).strftime('%A, %B %e, %Y');
    const author = _.get(post, 'author');
    const authorName = author ? _.trim(`${author.first_name} ${author.last_name}`) : null;

    return (
        <footer className="post-meta">
            <time className="published" dateTime={dateTimeAttr}>
                {formattedDate}
            </time>
            {authorName && `, by ${authorName}`}
        </footer>
    );
}
