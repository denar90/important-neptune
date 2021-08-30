import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import CtaButtons from './CtaButtons';
import classNames from '../utils/classNames';

export default function SectionPricing(props) {
    const section = _.get(props, 'section');
    const sectionId = _.get(section, 'section_id');
    const background = _.get(section, 'background', 'gray');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const pricingPlans = _.get(section, 'pricing_plans');

    return (
        <section id={sectionId} className={`block pricing-block bg-${background} outer`}>
            <div className="block-header inner-small">
                {title && <h2 className="block-title">{title}</h2>}
                {subtitle && <p className="block-subtitle">{subtitle}</p>}
            </div>
            {pricingPlans && (
                <div className="inner">
                    <div className="grid">
                        {_.map(pricingPlans, (plan, index) => (
                            <PricingPlan key={index} {...plan} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

function PricingPlan(plan) {
    const highlight = _.get(plan, 'highlight');
    const title = _.get(plan, 'title');
    const subtitle = _.get(plan, 'subtitle');
    const price = _.get(plan, 'price');
    const details = _.get(plan, 'details');
    const actions = _.get(plan, 'actions');

    return (
        <div className="cell plan">
            <div className={classNames('card', { highlight: highlight })}>
                <div className="plan-header">
                    {title && <h3 className="plan-title">{title}</h3>}
                    {subtitle && <div className="plan-subtitle">{subtitle}</div>}
                    {price && <div className="plan-price">{price}</div>}
                </div>
                {details && (
                    <div className="plan-content">
                        <ReactMarkdown>{details}</ReactMarkdown>
                    </div>
                )}
                {actions && (
                    <div className="plan-footer block-buttons">
                        <CtaButtons actions={actions} />
                    </div>
                )}
            </div>
        </div>
    );
}
