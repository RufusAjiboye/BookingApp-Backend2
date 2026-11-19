import { test, expect } from '../fixture/api-fixture.ts';
import { Recipe } from '../models/recipes.ts';

test('get vegetarian stir-fry recipe', async ({ clientApi }) => {
  const recipeId = 2;
  const expectedTags = ['Vegetarian', 'Stir-fry', 'Asian'];

  const response = await clientApi.makeRequest({
    method: 'GET',
    endpoint: `/recipes/${recipeId}`,
  });

  expect(response.status()).toBe(200);
  const recipeDetails = await response.json() as Recipe;

  expect(recipeDetails.id).toBe(recipeId);
  expect(recipeDetails.name).toBe('Vegetarian Stir-Fry');
  expect(recipeDetails.tags).toEqual(expectedTags);
});
