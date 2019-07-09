/**
 * 用户接口
 */
export interface IUser {
  id: string
  name: string
  birthDay: string
  city: string
}

/**
 * 用户列表接口
 */
export interface IUserTable extends IUser {
  no: number
}

/**
 * 单个用户的属性接口
 */
export interface IUserProperty {
  key: string
  value: string
}
