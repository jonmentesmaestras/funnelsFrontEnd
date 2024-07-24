const {getStoredValue} = require("./UseLocalStorageSvc");
const {NAME_HEADER_AUTH} = require("../utils/Constants");
module.exports = class RequestSvc {
    /**
     * Hacer una petición de tipo POST
     * @param endpoint Endpoint al que se hará la petición
     * @param payload Datos que se enviarán en la petición
     * @returns {Promise<{}>}
     */
    post = async (endpoint, payload) => {
        let headersToRequest = this.createHeaders();
        const requestOptions = {
            method: 'POST',
            headers: headersToRequest,
            redirect: 'follow',
            body: JSON.stringify(payload)
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return await this.processData(requestResponse);
    }

    /**
     * Actualizar la categoría
     * @param endpoint
     * @param payload
     * @param header
     * @returns {Promise<{}>}
     */
    put = async (endpoint, payload, header = []) => {
        let headersToRequest = this.createHeaders();
        const requestOptions = {
            method: 'PUT',
            headers: headersToRequest,
            redirect: 'follow',
            body: JSON.stringify(payload)
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return await this.processData(requestResponse);
    }

    /**
     * Eliminar la categoría
     * @param endpoint
     * @param header
     * @returns {Promise<{}>}
     */
    delete = async (endpoint, header) => {
        let headersToRequest = this.createHeaders();
        const requestOptions = {
            method: 'DELETE',
            headers: headersToRequest,
            redirect: 'follow'
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return await this.processData(requestResponse);
    }

    /**
     * Hacer una petición de tipo GET
     * @param endpoint Endpoint al que se hará la petición
     * @param header Headers que se desean enviar en la petición
     * @returns {Promise<{}>}
     */
    get = async (endpoint, header = []) => {
        let headersToRequest = this.createHeaders();
        const requestOptions = {
            method: 'GET',
            headers: headersToRequest,
            redirect: 'follow'
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return await this.processData(requestResponse);
    }

    /**
     * Hacer una petición sin enviar headers
     * @param endpoint
     * @returns {Promise<any>}
     */
    getRaw = async (endpoint) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        let requestResponse = await fetch(endpoint, requestOptions);
        return await requestResponse.json();
    }
    /**
     *
     * @param headers
     * @returns {[]}
     */
    createHeaders = (headers = []) => {
        let headersToRequest = headers;
        if (headers.length === 0) {
            headersToRequest = new Headers();
        }
        headersToRequest.append("Content-Type", "application/json");
        let auth = getStoredValue(NAME_HEADER_AUTH)
        if (auth) {
            headersToRequest.append("Authorization", `Bearer ${auth}`);
        }
        return headersToRequest;
    }
    /**
     * Procesar la respuesta de cada petición.
     * @param requestResponse
     * @returns {Promise<{}>}
     */
    processData = async (requestResponse) => {
        let structResponse = {}
        try {
            structResponse.http_code = requestResponse.status
            let response = await requestResponse.json();
            let {data} = response ?? response;
            structResponse.data = data;
            if (response.error) {
                let errorStruct = {};
                errorStruct.code = response.code;
                errorStruct.message = response.message;
                throw errorStruct;
            }
        } catch (err) {
            structResponse.error = true;
            structResponse.message = err.message ?? 'Unexpected error';
            structResponse.code = err.code ?? 500;
            structResponse.http_code = err.code ?? 500;
        }
        return structResponse;
    }

}