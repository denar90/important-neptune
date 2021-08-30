import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import CtaButtons from './CtaButtons';
import withPrefix from '../utils/withPrefix';

export default function SectionFeatures(props) {
    const section = _.get(props, 'section');
    const sectionId = _.get(section, 'section_id');
    const background = _.get(section, 'background', 'gray');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const features = _.get(section, 'features');

    return (
        <section id={sectionId} className={`block features-block bg-${background} outer`}>
            <div className="block-header inner-small">
                {title && <h2 className="block-title">{title}</h2>}
                {subtitle && <p className="block-subtitle">{subtitle}</p>}
            </div>
            {features && (
                <div className="inner">
                    {_.map(features, (feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </div>
            )}
        </section>
    );
}

function FeatureItem(featureItem) {
    const image = _.get(featureItem, 'image');
    const imageAlt = _.get(featureItem, 'image_alt');
    const title = _.get(featureItem, 'title');
    const content = _.get(featureItem, 'content');
    const actions = _.get(featureItem, 'actions');

    return (
        <div className="block-item">
            <div className="grid">
                {image && (
                    <div className="cell block-preview">
                        <img src={withPrefix(image)} alt={imageAlt} />
                    </div>
                )}
                <div className="cell block-content">
                    <h3 className="block-title underline">{title}</h3>
                    <div className="block-copy">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                    {actions && (
                        <div className="block-buttons">
                            <CtaButtons actions={actions} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
