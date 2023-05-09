// pages/_document.tsx 파일
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=09c93f3059a9f8639cf78e21b3ae44a6&libraries=services"></script>
                    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
                </Head>
                <body className="bg-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
