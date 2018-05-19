export const requestsConfig = {
    "USE_MOCK": false,
    "COLLAPSED_LOG_REQUESTS": true,
    "API_URL": process.env.NODE_ENV === 'development'
        ? `${process.env.API_URL_DEV}`
        : window.location.origin + '/api'
}
