import { describe, expect, it } from 'vitest'
import { User } from './user'

describe('User', () => {
  it('should be able to create user', async () => {
    const user = new User({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe123',
      location: 'BR',
    })

    await user.hashPassword()

    expect(user).toBeInstanceOf(User)
    expect(user.id).toBeDefined()
    expect(user.createdAt).toBeDefined()
    expect(user.updatedAt).toBeDefined()
    expect(user.password).not.toBe('johndoe123')
  })
})
