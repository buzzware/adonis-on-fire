import { test } from '@japa/runner'

test.group('Authentication', () => {
  test('login', async ({ client }) => {
    const response = await client.get('/users')

    console.log(response.body())
  })
})
