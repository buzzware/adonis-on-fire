import { test } from '@japa/runner'
//import { expect } from '@japa/expect'

// test('display welcome page', async ({ client }) => {
//   const response = await client.get('/')
//
//   response.assertStatus(200)
//   response.assertBodyContains({ hello: 'world' })
// })

test.group('Group name', (group) => {
  group.each.setup(async () => {
    console.log('before group')
    return () => console.log('after group')
  })

  test('simple', async ({expect}) => {
    console.log('hello')
    expect(true).toEqual(true);
  })
})


