import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
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
