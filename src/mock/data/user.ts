import Mock from 'mockjs'
import { IUser } from '../../modal/user'

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

const users = mockUsers()

export { users }
