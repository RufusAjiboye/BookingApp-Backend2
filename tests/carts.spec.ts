import { test, expect } from '../fixture/api-fixture.ts';

test('add products to cart', async ({ clientApi }) => {
    const cartContent = {
    userId: 30,
    products: [
      {
        id: 15,
        quantity: 3,
      },
      {
        id: 25,
        quantity: 1,
      },
      {
        id: 11,
        quantity: 5,
      },
    ]
  }

  const expectedProductQuantity = 9;
  const expectedTotalProducts = 3;
  const expectedUserId = 30;

    // Example API request using the clientApi
    const response = await clientApi.makeRequest({
      method: 'POST',
      endpoint: `/carts/add`,
      headers: {
        'authorization': 'Bearer ${access_token}',
      },
      body: cartContent,
    });

    // Expect the response to be successful
    expect(response.status()).toBe(201);
    const productDetails = await response.json()

    console.log('productDetails:', productDetails);
    //API reponse interrogation
    expect(productDetails.totalQuantity).toBe(expectedProductQuantity);
    expect(productDetails.totalProducts).toBe(expectedTotalProducts);
    expect(productDetails.userId).toBe(expectedUserId);
});