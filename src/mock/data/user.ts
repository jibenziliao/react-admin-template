import Mock from 'mockjs'
import { User as UserProps } from '../../modal/user'

/** mock用户列表 */
const mockUsers = (): UserProps[] => {
  const arr = []
  for (let i = 0; i < 10; i++) {
    const mockItem: UserProps = Mock.mock({
      id: Mock.Random.id(),
      name: Mock.Random.cname(),
      birthDay: Mock.Random.date('yyyy-MM-dd'),
      city: Mock.Random.county(true)
    })
    arr.push(mockItem)
  }
  return arr
}

/** mock出的用户 */
const users = mockUsers()

export { users }
