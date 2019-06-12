import Mock from 'mockjs'

interface IUser {
  key: string
  id: string
  name: string
  birthDay: string
  city: string
}

const mockUsers = (): IUser[] => {
  const arr = []
  for (let i = 0; i < 15; i++) {
    const mockItem: IUser = Mock.mock({
      key: Mock.Random.id(),
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
