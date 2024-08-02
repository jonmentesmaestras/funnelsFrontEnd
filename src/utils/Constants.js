// export const BASE_URL_DASHBOARD = "https://nodeapi.tueducaciondigital.site/"
export const BASE_API_URL = 'https://nodeapi.tueducaciondigital.site/'
const BASE_URL_API_OPS = 'nodeapi.tueducaciondigital.site';
const BASE_URL_API_DEV = 'localhost';
const BACKEND_PORT = "3002"
const PROTOCOL = window.location.protocol;
export const HOST = PROTOCOL === 'https:' ? `${BASE_URL_API_OPS}` : `${BASE_URL_API_DEV}:${BACKEND_PORT}`;
export const BASE_URL_API = `${window.location.protocol}/${HOST}/`;

export const TEXT_CATEGORY_BTN = Object.freeze({
    CREATE: 'Crear nueva categoría',
    CANCEL: 'Cancelar crear categoría'
})

export const API = Object.freeze({
    FUNNELSTRACK: BASE_URL_API + 'usertrack',
    FUNNELS: BASE_URL_API + 'funnels',
    FUNNELS_CATEGORY: BASE_URL_API + 'funnels/category',
    FUNNELS_LINKS: BASE_URL_API + 'funnels/links',
    FUNNELS_SITEMAP: "https://funnels.tueducaciondigital.site/funnel/get_sitemap_urls?domain="
})
// FUNNELS_SITEMAP: 'https://funnels.tueducaciondigital.site/funnel/get_sitemap_urls?domain=',
export const BASE_URL_FRONT_END = `${window.location.protocol}/${window.location.host}/`;
export const URL_LOGIN = `${BASE_URL_FRONT_END}login`;
export const NAME_HEADER_AUTH = "T-CS";
