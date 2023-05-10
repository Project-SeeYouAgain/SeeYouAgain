// const withPWA = require('next-pwa');
// const isProduction = process.env.NODE_ENV === 'production';

// /** @type {import('next').NextConfig} */

// const nextConfig = withPWA({
//     // reactStrictMode: false,
//     dest: 'public',
//     // disable: !isProduction,
//     runtimeCaching: [],
//     images: {
//         domains: ['seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
//     },
// });

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */

// const nextConfig = withPWA({
//     // reactStrictMode: false,
//     dest: 'public',
//     // disable: !isProduction,
//     runtimeCaching: [],
//     // images 옵션을 주석 처리하고,
//     // 대신 experimental 속성을 사용하여 이미지 최적화를 구성합니다.
//     experimental: {
//         optimizeImages: true,
//     },
//     images: {
//         domains: ['seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
//     },
// });

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
    images: {
        domains: ['seeyouagain-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
    },
});
module.exports = nextConfig;

module.exports = nextConfig;
