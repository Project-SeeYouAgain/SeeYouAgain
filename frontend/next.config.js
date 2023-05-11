

/** @type {import('next').NextConfig} */

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