import _ from 'lodash';

const BASE_PATH = '';

export default function withPrefix(url) {
    if (!url) {
        return url;
    }

    if (_.startsWith(url, '#') || _.startsWith(url, 'http://') || _.startsWith(url, 'https://')) {
        return url;
    }
    return '/' + _.compact([_.trim(BASE_PATH, '/'), _.trimStart(url, '/')]).join('/');
}
