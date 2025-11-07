const configLocal = JSON.parse(open('../config/config.local.json'))

export function pegarBaseUrl() {
    return baseURL = __ENV.BASE_URL || configLocal.baseURL;
}