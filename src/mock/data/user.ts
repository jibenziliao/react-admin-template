import Mock from 'mockjs'
import { IUser } from '../../modal/user'

/**
 * mock用户列表
 */
const mockUsers = (): IUser[] => {
  const arr = []
  for (let i = 0; i < 10; i++) {
    const mockItem: IUser = Mock.mock({
      id: Mock.Random.id(),
      name: Mock.Random.cname(),
      birthDay: Mock.Random.date('yyyy-MM-dd'),
      city: Mock.Random.county(true)
    })
    arr.push(mockItem)
  }
  return arr
}

/**
 * mock出的用户
 */
const users = mockUsers()

export { users }
