import React from 'react';
import _ from 'lodash';

import Link from '../utils/link';
import withPrefix from '../utils/withPrefix';

export default function ActionLink(props) {
    const action = _.get(props, 'action');
    const url = _.get(action, 'url');
    const label = _.get(action, 'label', null);
    const newWindow = _.get(action, 'new_window');
    const noFollow = _.get(action, 'no_follow');
    const attrs = {};
    if (newWindow) {
        attrs.target = '_blank';
    }
    if (newWindow || noFollow) {
        attrs.rel = [(newWindow ? 'noopener' : '') + (noFollow ? 'nofollow' : '')].join(' ');
    }

    return (
        <Link href={withPrefix(url)} {...attrs}>
            {label}
        </Link>
    );
}
