// styled-compnents를 SSR 하려면, _document.js 가 필요 (app.js 위에 document.js가 있다)
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    console.log(ctx.renderPage);
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        }); // SSR 할 때
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (err) {
      console.error(err);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// 이걸 하면 app.js가 document.js로 감싸지면서 제일 위에 있는 html, head, body 까지 수정이 가능해진다
// 여기서 SSR을 해야되는데 getInitalProps가 있다
// getInitalProps: document나 app에서 쓰는 특수한 SSR method 이다

//! IE에서 실행하면 document.js가 안돌아간다 해결 방법은? (하단에 Polyfill.io)
//! nextScript 위에 script 추가, Polyfill.io > CREATE A POLYFILL BUNDLE > copy URL HTML after check default ~ es2019
