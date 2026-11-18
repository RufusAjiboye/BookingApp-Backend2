import { test, expect } from '../fixture/api-fixture.ts';
import { Recipe } from '../models/recipes.ts';

test('get a specfic recipe', async ({ clientApi }) => {
    const recipeId = 1; // Replace with the actual product ID you want to retrieve
    
    // Example API request using the clientApi
    const response = await clientApi.makeRequest({
      method: 'GET',
      endpoint: `/recipes/${recipeId}`,
      headers: {
        'authorization': 'Bearer ${access_token}'
      }
    });

    // Expect the response to be successful
    expect(response.status()).toBe(200);

    const productDetails = await response.json() as Recipe
    console.log('productDetails:', productDetails);
    
    //API reponse interrogation
    expect(productDetails.id).toBe(1);
    //expect(productDetails.name).toBe("Vegetarian Stir-Fry");
    //expect(productDetails.name).toBe("Saag (Spinach) with Makki di Roti");
 });
 