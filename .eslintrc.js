module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: ['standard', 'plugin:jest/recommended'],
  plugins: ['babel', 'import', 'react', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'react/no-find-dom-node': 'off', // I don't know
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/jsx-one-expression-per-line': 'off',
    "react/jsx-closing-bracket-location": 1, //在JSX中验证右括号位置
    "react/jsx-indent-props": [2, 4], //验证JSX中的props缩进
    "react/jsx-no-bind": 0, //JSX中不允许使用箭头函数和bind
    "react/jsx-no-duplicate-props": 2, //防止在JSX中重复的props
    "react/jsx-no-literals": 0, //防止使用未包装的JSX字符串
    "react/jsx-no-undef": 1, //在JSX中禁止未声明的变量
    "react/jsx-pascal-case": 0, //为用户定义的JSX组件强制使用PascalCase
    "react/no-deprecated": 1, //不使用弃用的方法
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
