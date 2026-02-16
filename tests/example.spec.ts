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


// Create and delete Article 

test('Create and delete Article', async ({ request }) => {
  const createArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: { user: { email: "nahid@test.com", password: "nahid@test.com" } }
  })

  const tokenResponseJson = await createArticleResponse.json();
  const authToken = 'Token ' + tokenResponseJson.user.token

  // Create and Delete New Post 
  const createNewPostResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {
        "title": "Test Post",
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
  // console.log(newPostResponseJson);
  expect(createNewPostResponse.status()).toBe(201)
  expect(newPostResponseJson.article.title).toEqual('Test Post')
  const slugId = newPostResponseJson.article.slug

  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      Authorization: authToken
    }
  })
  const articlesResponseJson = await articlesResponse.json();
  expect(articlesResponse.status()).toBe(200)
  expect(articlesResponseJson.articles[0].title).toEqual('Test Post')

  // Delete Post 

  const deletePostResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      Authorization: authToken
    }
  })

  expect(deletePostResponse.status()).toBe(204)
})