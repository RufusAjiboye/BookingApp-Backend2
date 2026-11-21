import { test, expect } from '../fixture/api-fixture.ts';
import { Product } from '../models/products.ts';

test.describe('Dummy JSON Products API Tests', () => {
  let access_token = ""; // Replace with your actual access token if required
  test.beforeAll(async ({ clientApi }) => {

    const response = await clientApi.makeRequest({
      method: 'POST',
      endpoint: '/auth/login',
      body: {
        username: process.env.DUMMYJSON_USERNAME,
        password: process.env.DUMMYJSON_PASSWORD,
      },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('accessToken');

    access_token = data.accessToken; // should be same accessToken as it is used in POST request, After request in POSTAMN
    console.log('Access token:', access_token);
  });


  test('get a product', async ({ clientApi }) => {
    const MYproductId = 15; // Replace with the actual product ID you want to retrieve

    // Example API request using the clientApi
    const response = await clientApi.makeRequest({
      method: 'GET',
      endpoint: `/products/${MYproductId}`,
      headers: {
        'authorization': 'Bearer ${access_token}'
      }
    });

    // Expect the response to be successful
    expect(response.status()).toBe(200);
    const productDetails = await response.json() as Product

    console.log('productDetails:', productDetails);
    //API reponse interrogation
    expect(productDetails.price).toBe(799.99);
    expect(productDetails.brand).toBe("Bath Trends");
 });
});











// ctrl + alt + arrow down to do multipl line delete
