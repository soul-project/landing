/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const { withContentlayer } = require("next-contentlayer");

const moduleExports = () => {
  const nextConfig = {
    reactStrictMode: true,
  };
  return nextConfig;
};

const sentryWebpackPluginOptions = { silent: true };

if (process.env.APP_ENV === "production") {
  module.exports = withSentryConfig(
    withContentlayer(moduleExports),
    sentryWebpackPluginOptions
  );
} else {
  module.exports = withContentlayer(moduleExports);
}
