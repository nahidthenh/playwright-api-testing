import { test, expect } from '@playwright/test';
import { RequestHandeler } from '../utils/request-handler';

test('first test', async ({ }) => {

    const api = new RequestHandeler();

    api
        .url('https://conduit-api.bondaracademy.com/api')
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({
            Authorization: 'authToken'
        })
        .body({
            "article": {
                "title": "Test Post Updated 2026",
                "description": "Hello",
                "body": "Hello",
                "tagList": []
            }
        })
})