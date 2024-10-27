/**
 * Configuration for the web application.
 * This includes settings for local and production environments.
 *
 * LOCAL_PORT: The port used for local development.
 * LOCAL_DOMAIN_NAME: The domain name used for local development.
 * PROD_PORT: The port used for production.
 * PROD_DOMAIN_NAME: The domain name used for production.
 *
 * DOMAIN_NAME: The domain name that changes based on the environment (development or production).
 * PORT: The port that changes based on the environment (development or production).
 * PATH: The path to the web resources.
 */

const LOCAL_PORT = 9000
const LOCAL_DOMAIN = `localhost`
const LOCAL_DOMAIN_FULL = `${LOCAL_DOMAIN}:${LOCAL_PORT}`

const PROD_PORT = 443
const PROD_DOMAIN = 'clean-template'
const PROD_CERTIFICATE_ARN =
  'arn:aws:acm:us-east-1:112233445566:certificate/3a958790-8878-4cdc-a396-06d95064cf63'

const PATH = 'src/web'
const PROD_DOMAIN_CONFIG: sst.aws.NextjsArgs['domain'] = {
  name: PROD_DOMAIN,
  dns: false,
  cert: PROD_CERTIFICATE_ARN
}

export {
  LOCAL_PORT,
  LOCAL_DOMAIN,
  PROD_PORT,
  PROD_DOMAIN,
  PROD_CERTIFICATE_ARN,
  PROD_DOMAIN_CONFIG,
  PATH,
  LOCAL_DOMAIN_FULL
}
