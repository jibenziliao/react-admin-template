/**
 * 存储sessionStorage
 */
export const setStore = (name: string, content: any) => {
  if (!name) {
    return false
  }
  let param = ''
  if (typeof content !== 'string') {
    param = JSON.stringify(content)
  } else {
    param = content
  }
  window.sessionStorage.setItem(name, param)
}

/**
 * 获取sessionStorage
 */
export const getStore = (name: string) => {
  if (!name) {
    return false
  }
  try {
    const json = window.sessionStorage.getItem(name) || ''
    return JSON.parse(json)
  } catch (error) {
    return window.sessionStorage.getItem(name)
  }
}

/**
 * 删除sessionStorage
 */
export const removeStore = (name: string) => {
  if (!name) {
    return false
  }
  window.sessionStorage.removeItem(name)
}

/**
 * 删除所有的sessionStorage
 */
export const removeAllStore = () => {
  window.sessionStorage.clear()
}
