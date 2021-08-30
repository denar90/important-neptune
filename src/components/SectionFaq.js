import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

export default class SectionFaq extends React.Component {
    constructor(props) {
        super(props);
        this.handorgelRef = React.createRef();
    }

    componentDidMount() {
        const handorgelElm = _.get(this.handorgelRef, 'current');
        if (handorgelElm) {
            new handorgel(handorgelElm, {
                multiSelectable: true
            });
        }
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const background = _.get(section, 'background', 'gray');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const faqItems = _.get(section, 'faq_items');

        return (
            <section id={sectionId} className={`block faq-block bg-${background} outer`}>
                <div className="inner-small">
                    <div className="block-header">
                        {title && <h2 className="block-title">{title}</h2>}
                        {subtitle && <p className="block-subtitle">{subtitle}</p>}
                    </div>
                    {faqItems && (
                        <div className="faq-accordion handorgel" ref={this.handorgelRef}>
                            {_.map(faqItems, (faqItem, index) => (
                                <FaqItem key={index} {...faqItem} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

function FaqItem(faqItem) {
    const question = _.get(faqItem, 'question');
    const answer = _.get(faqItem, 'answer');

    return (
        <React.Fragment>
            <h3 className="faq-accordion-header handorgel__header">
                <button className="handorgel__trigger">
                    <span>{question}</span>
                    <span className="handorgel__icon icon-plus" />
                </button>
            </h3>
            <div className="faq-accordion-content handorgel__content">
                <div className="handorgel__content-inner">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                </div>
            </div>
        </React.Fragment>
    );
}
