import { test, expect } from '@playwright/test';

test('Get Test Tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags/')
  // console.log(tagsResponse);
  const testResponseJson = await tagsResponse.json();
  expect(tagsResponse.status()).toBe(200)
  expect(testResponseJson.tags[0]).toEqual('Test')
  expect(testResponseJson.tags.length).toBeLessThanOrEqual(10);
});

test('Get all Articles', async ({ request }) => {
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0')
  const articlesResponseJson = await articlesResponse.json();

  expect(articlesResponse.status()).toBe(200)
  expect(articlesResponseJson.articlesCount).toBe(10)
})


test('Create an Article', async ({ request }) => {
  const createArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: { user: { email: "nahid@test.com", password: "nahid@test.com" } }
  })

  const tokenResponseJson = await createArticleResponse.json();
  const authToken = 'Token ' + tokenResponseJson.user.token

  // Create New Post 
  const createNewPostResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {
        "title": "Hello_Nahid_2025",
        "description": "Hello",
        "body": "Hello",
        "tagList": []
      }
    },
    headers: {
      Authorization: authToken
    }
  })

  const newPostResponseJson = await createNewPostResponse.json();
  expect(createNewPostResponse.status()).toBe(201)
})