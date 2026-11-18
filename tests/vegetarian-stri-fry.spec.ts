import { test, expect } from '../fixture/api-fixture.ts';
test('get a product', async ({ clientApi }) => {
    const recipeId = 2; // Replace with the actual product ID you want to retrieve
    const expectedTags = ['Vegetarina, Stir-fry, Asian']

    // Example API request using the clientApi
    const response = await clientApi.makeRequest({
      method: 'GET',
      endpoint: `/products/${recipeId}`,
      headers: {
        'authorization': 'Bearer ${access_token}'
      }
    });
    
    expect(response.status()).toBe(200);
    const recipeDetails = await response.json()

    const actualtags = recipeDetails.tags;
    expect(actualtags).toEqual(expectedTags);

    //console.log('recipeDetails:', expectedTags);
  
 });
