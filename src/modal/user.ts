/** 用户接口 */
export interface User {
  id: string
  name: string
  birthDay: string
  city: string
}

/** 用户列表接口 */
export interface UserTable extends User {
  no: number
}

/** 单个用户的属性接口 */
export interface UserProperty {
  key: string
  value: string
}
