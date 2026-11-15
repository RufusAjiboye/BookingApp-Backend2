import { test as base, expect } from '@playwright/test';
import { ClientApi } from '../client/client-apit';

type ApiFixture = {
 clientApi: ClientApi;
};

export const test = base.extend<ApiFixture>({
    clientApi: async ({ request }, use) => {
        const clientApi = new ClientApi(request);
        await use(clientApi);
        //await use(new ClientApi(request));
    }
});

export { expect };
