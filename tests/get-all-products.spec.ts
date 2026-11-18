import { test, expect } from '../fixture/api-fixture.ts';
import { Product } from '../models/products.ts';

  test('Verify that product with brand gucci have no return policy', async ({ clientApi }) => {
    // Example API request using the clientApi
    const response = await clientApi.makeRequest({
      method: 'GET',
      endpoint: `/products`,
      headers: {
        'authorization': 'Bearer ${access_token}'
      },
      params: {
        limit: '20',
        select: 'title,price,category,brand,stock,returnPolicy',
      }
    });

    expect(response.status()).toBe(200); // Expect the response to be successful
    const productDetails = await response.json()// convert API response into JSON object(deserilisation)

    const gucciProducts = productDetails.products.find((x: Product) => x.brand ==='Gucci');
    const mgucciProducts = productDetails.products.find((x: Product) => x.price === 9.99);
    console.log(gucciProducts['returnPolicy']);
    console.log(gucciProducts['price']);

    //API reponse interrogation
    expect(gucciProducts.returnPolicy).toBe("No return policy")
    expect(mgucciProducts.price).toBe(9.99)
 });