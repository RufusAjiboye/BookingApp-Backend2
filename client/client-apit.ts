import { APIResponse, APIRequestContext} from '@playwright/test';

export type ApiRequestMethod = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' ;
};

export interface ApiRequestOptions {
  endpoint: string;
  method: ApiRequestMethod['method'];
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
};

export class ClientApi {
    constructor(private apiRequest: APIRequestContext) {} // Inject the APIRequestContext instance into the constructor
                                                           // This is a primary constructor, the variable and the parameter are declared in the same line, and the variable is automatically assigned the value of the parameter.

    async makeRequest({ 
        method, 
        endpoint, 
        body, 
        params, 
        headers 
    }: ApiRequestOptions): Promise<APIResponse> {
        return this.apiRequest.fetch(endpoint, {
            method, 
            headers, 
            data: body,
            params,
        });
    }
}