import Document, { Html, Head, Main, NextScript } from 'next/document';
import classNames from '../utils/classNames';
import React from 'react';
import _ from 'lodash';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        const config = _.get(this.props, '__NEXT_DATA__.props.pageProps.config');
        const font = _.get(config, 'base_font', 'nunito-sans');
        const palette = _.get(config, 'palette', 'blue');
        return (
            <Html>
                <Head>
                    {font !== 'system-sans' && <link rel="preconnect" href="https://fonts.gstatic.com" />}
                    {font === 'nunito-sans' && (
                        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
                    )}
                    {font === 'fira-sans' && (
                        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
                    )}
                </Head>
                <body className={classNames(`palette-${palette}`, `font-${font}`)}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
