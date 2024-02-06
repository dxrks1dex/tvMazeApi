/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    i18n: {
        locales: ['default', 'en', 'ru'],
        defaultLocale: 'default',
        localeDetection: false,
    },
    trailingSlash: true,
};

export default nextConfig;
