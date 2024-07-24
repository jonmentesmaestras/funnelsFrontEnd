import RequestSvc from "./RequestSvc";
import {API, URL_LOGIN} from "../utils/Constants";

/**
 * Crear una nueva categoría.
 * @param categoryName
 * @returns {Promise<{}>}
 */
export const createCategory = async (categoryName) => {
    // Crear el payload
    let payload = {"categoryName": categoryName}
    let requestSvc = new RequestSvc();
    let result = await requestSvc.post(API.FUNNELS_CATEGORY, payload)
    if (result.http_code === 401) {
        window.location.href = URL_LOGIN;
        return false;
    }
    return result;
}

/**
 * Cargar las categorías del usuario.
 * @returns {Promise<{}>}
 */
export const loadUserCategories = async () => {
    let requestSvc = new RequestSvc();
    let result = await requestSvc.get(API.FUNNELS);
    if (result.http_code === 401) {
        window.location.href = URL_LOGIN;
    }
    return result;
}

/**
 * Guardar los links según la categoría
 * @param payload
 * @returns {Promise<{}>}
 */
export const saveLink = async (payload) => {
    let requestSvc = new RequestSvc();
    return await requestSvc.post(API.FUNNELS_LINKS, payload)
}

export const updateCategories = async (payload) => {
    let requestSvc = new RequestSvc();
    return await requestSvc.put(API.FUNNELS_CATEGORY, payload)
}

export const deleteCategory = async (category_id) => {
    let requestSvc = new RequestSvc();
    let result = await requestSvc.delete(API.FUNNELS_CATEGORY + "/" + category_id);
    if (result.http_code === 401) {
        window.location.href = URL_LOGIN;
    }
    return result;
}

export const userTrack = async () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const src = queryParameters.get('src') ?? ""
    let requestSvc = new RequestSvc();
    let url = API.FUNNELSTRACK + "?evento=Funnels&src=" + src
    let result = await requestSvc.get(url);
    if (result.http_code === 401) {
        window.location.href = URL_LOGIN;
    }
    return result;
}
