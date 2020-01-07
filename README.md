# 基础模板文档

可搭配 [cy-react-cli](https://github.com/jibenziliao/cy-react-cli)使用，cy-react-cli默认模板为此模板

#### 1. <a href="#环境配置">环境配置</a>
#### 2. <a href="#相关技术栈">相关技术栈</a>
#### 3. <a href="#目录说明">目录说明</a>
#### 4. <a href="#mock说明">mock说明</a>
#### 5. <a href="#编辑器插件列表">编辑器插件列表</a>
#### 6. <a href="#编辑器配置">编辑器配置</a>
#### 7. <a href="#模板说明">模板说明</a>

__ __

## 环境配置

  node >= v12.0

  yarn

## 相关技术栈

1. [TypeScript中文文档](https://www.tslang.cn/docs/home.html)

2. [TypeScript官方文档](https://www.typescriptlang.org/docs/home.html)

3. [React官方中文文档](https://zh-hans.reactjs.org/docs/getting-started.html)

4. [React官方英文文档](https://reactjs.org/docs/getting-started.html)

5. [ant-design](https://ant.design/docs/react/introduce-cn)

6. [Create React App](https://github.com/facebook/create-react-app)

7. [mockjs文档](https://github.com/nuysoft/Mock/wiki)

8. [Axios](https://github.com/axios/axios)

## 目录说明

    .
    ├── README.md
    ├── config-overrides.js
    ├── doc
    ├── package.json
    ├── public
    ├── src
    │   ├── App.less
    │   ├── App.module.less
    │   ├── App.test.tsx
    │   ├── App.tsx
    │   ├── assets
    │   │   └── logo.png
    │   ├── components
    │   ├── config
    │   │   └── Constant.ts
    │   ├── index.css
    │   ├── index.tsx
    │   ├── mock
    │   │   ├── data
    │   │   │   ├── loginUser.ts
    │   │   │   └── user.ts
    │   │   └── mock.ts
    │   ├── modal
    │   │   ├── loginUser.ts
    │   │   ├── page.ts
    │   │   └── user.ts
    │   ├── react-app-env.d.ts
    │   ├── routers
    │   │   └── Router.ts
    │   ├── serviceWorker.ts
    │   ├── store
    │   │   ├── Actions.ts
    │   │   ├── Reducer.ts
    │   │   └── Store.ts
    │   ├── theme
    │   │   └── theme.less
    │   ├── utils
    │   │   ├── request.ts
    │   │   └── util.ts
    │   └── views
    │       ├── home
    │       │   └── Home.tsx
    │       ├── login
    │       │   ├── Login.module.less
    │       │   └── Login.tsx
    │       ├── logs
    │       │   └── userLog
    │       │       └── UserLog.tsx
    │       └── user
    │           ├── User.module.less
    │           ├── User.tsx
    │           ├── UserModal.tsx
    │           └── UserViewModal.tsx
    ├── tsconfig.json
    └── yarn.lock

## mock说明

默认使用mockjs模拟接口

在src/index.tsx中注释掉``Mock.bootstrap()``即可访问真实接口

```javascript
// mock请求启动，若有接口，可注释此行。请求代理在package.json中proxy字段
Mock.bootstrap()
```
[mockjs文档](https://github.com/nuysoft/Mock/wiki)

[axios-mock-adapter文档](https://github.com/ctimmerm/axios-mock-adapter)

接口代理配置在``package.json``中的``proxy``字段

## 编辑器插件列表

* [TSLint (deprecated)](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode#review-details)
* [autoprefixer](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-autoprefixer#review-details)
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense#review-details)
* [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens#review-details)
* [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag#review-details)
* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag#review-details)
* [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer#review-details)
* [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig#review-details)
* [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore#review-details)
* [Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides#review-details)
* [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion#review-details)

## 编辑器配置

使用 [VS Code](https://code.visualstudio.com/) 编辑器

```json
// 将设置放入此文件中以覆盖默认设置
{
  "editor.fontSize": 14,
  "workbench.activityBar.visible": false,
  "editor.renderWhitespace": "boundary",
  "window.zoomLevel": 0,
  "editor.wordWrap": "bounded",
  "editor.insertSpaces": true,
  "editor.rulers": [120],
  "editor.scrollBeyondLastLine": true,
  "editor.detectIndentation": false,
  "editor.tabSize": 2,
  "editor.wordWrapColumn": 120,
  "editor.minimap.enabled": true,
  "search.exclude": {
    "**/dist": true
  },
  "editor.snippetSuggestions": "top",
  "window.openFilesInNewWindow": "off",
  "html.format.indentInnerHtml": true,
  "autoprefixer.findExternalAutoprefixer": true,
  "path-intellisense.extensionOnImport": true,
  "editor.renderIndentGuides": false,
  "files.associations": {
    "*.vue": "vue",
    "*.wpy": "vue",
    "*.tsx": "typescriptreact"
  },
  "typescript.check.npmIsInstalled": false,
  "auto-rename-tag.activationOnLanguage": ["*", ".vue"],
  "html.format.endWithNewline": true,
  "html.format.indentHandlebars": true,
  "javascript.format.insertSpaceAfterConstructor": true,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.insertSpaceAfterConstructor": true,
  "editor.acceptSuggestionOnCommitCharacter": false,
  "editor.minimap.showSlider": "always",
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "javascript.implicitProjectConfig.checkJs": true,
  "javascript.validate.enable": false,
  "gitlens.advanced.messages": {
    "suppressCommitHasNoPreviousCommitWarning": false,
    "suppressCommitNotFoundWarning": false,
    "suppressFileNotUnderSourceControlWarning": false,
    "suppressGitVersionWarning": false,
    "suppressLineUncommittedWarning": false,
    "suppressNoRepositoryWarning": false,
    "suppressResultsExplorerNotice": true,
    "suppressShowKeyBindingsNotice": true
  },
  "breadcrumbs.enabled": true,
  "scm.alwaysShowProviders": true,
  "extensions.autoUpdate": true,
  "gitlens.views.repositories.files.layout": "auto",
  "gitlens.views.fileHistory.enabled": true,
  "gitlens.views.lineHistory.enabled": true,
  "eslint.alwaysShowStatus": true,
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": false,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.suggestSelection": "first",
  "bookmarks.useWorkaroundForFormatters": true,
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.reportStyleChecksAsWarnings": false,
  "tslint.nodePath": "./node_modules/tslint",
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.iconTheme": "vscode-icons",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.colorTheme": "Monokai",
  "search.showLineNumbers": true,
  "gitlens.defaultDateStyle": "absolute",
  "todo-tree.highlights.enabled": true,
  "javascript.updateImportsOnFileMove.enabled": "never",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 模板说明

常规中后台页面布局如下

![概览][概览]

![概览][查看]

![概览][编辑]

![概览][删除]

[概览]: ./doc/images/概览.png
[查看]: ./doc/images/查看.png
[编辑]: ./doc/images/编辑.png
[删除]: ./doc/images/删除.png

