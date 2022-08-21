const axios = require('axios').default;
const { stringValidator } = require('../util/validatiors');
const ErrorResponse = require('./ErrorResponse');

const resources = Object.freeze({
    PROPERTIES: Symbol('/properties'),
    CONTACT_REQUESTS: Symbol('/contact_requests')
});

const methods = Object.freeze({
    GET: Symbol('get'),
    POST: Symbol('post'),
})

class EasyBrokerApi {
    constructor() {
        this.apiKey = process.env.EASY_BROKER_API_KEY;
        this.urlBase = process.env.EASY_BROKER_URL;
        this.endpoints = {
            properties: {
                get: function (options = {}) {
                    return {
                        method: methods.GET.description,
                        resource: resources.PROPERTIES.description,
                        params: options.params ? { ...options.params } : {},
                    }
                },
                getProperty: function (options = {}) {
                    if (!options.id) {
                        throw new ErrorResponse('id required for this endpoint, try again.')
                    }
                    return {
                        method: methods.GET.description,
                        resource: resources.PROPERTIES.description + '/' + options.id,
                    }
                },
                post: function (options = {}) {
                    if (!options.data) {
                        throw new ErrorResponse('data required for this endpoint, try again.', 400);
                    }
                    return {
                        method: methods.POST.description,
                        resource: resources.PROPERTIES.description,
                        data: options.data,
                    }
                }
            },
            contactRequests: {
                get: function (options = {}) {
                    return {
                        method: methods.GET.description,
                        resource: resources.CONTACT_REQUESTS.description,
                        params: options.params ? { ...options.params } : {},
                    }
                },
                post: function (options = {}) {
                    if (!options.data) {
                        throw new ErrorResponse('data required for this endpoint, try again.', 400);
                    }
                    return {
                        method: methods.POST.description,
                        resource: resources.CONTACT_REQUESTS.description,
                        data: options.data,
                    }
                }
            }
        }
        this.headers = {
            'X-Authorization': this.apiKey,
            'Content-Type': 'application/json'
        };
    }

    async properties(method = '', options = {}) {
        const existingEndpoint = this.endpoints.properties[method]
        if (!existingEndpoint) {
            throw new ErrorResponse('Invalid method for properties', 500);
        }

        const endpoint = existingEndpoint(options);

        const response = await this.request(endpoint);
        return response;
    }

    async request(endpoint) {
        const url = this.urlBase + endpoint.resource;
        const config = {
            url: url,
            headers: this.headers,
            method: endpoint?.method,
            data: endpoint?.data ? endpoint.data : null,
            params: endpoint?.params ? endpoint.params : null,
        }
        const res = await axios(config);
        const response = res.data
        if (stringValidator(response)) {
            throw new ErrorResponse('The EasyBrokerAPI response is not JSON, review request.', 400, response);
        }
        if (res.status >= 400 && response.status <= 499) {
            throw new ErrorResponse('The EasyBrokerApi response was unsuccessful, review request.', res.status, response)
        }
        return response;
    }
}

module.exports = EasyBrokerApi;