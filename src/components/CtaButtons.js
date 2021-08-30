import React from 'react';
import _ from 'lodash';

import Action from './Action';

export default function CtaButtons(props) {
    const actions = _.get(props, 'actions');
    return _.map(actions, (action, idx) => <Action key={idx} action={action} />);
}
