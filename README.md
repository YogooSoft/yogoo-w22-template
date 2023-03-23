```bash
     __  __   ____     ____ _   ____     ____ 
    / / / /  / __ \   / __  /  / __ \   / __ \
   / /_/ /  / /_/ /  / /_/ /  / /_/ /  / /_/ /
   \__, /   \____/   \__, /   \____/   \____/ 
  /____/            /____/                         悦高快速开发构建框架

```

[![license](https://img.shields.io/badge/yogoo--w22--template-MIT-yellowgreen)](LICENSE)


## yogoo-w22-template
                                   

悦高W22快速开发框架-前端模板

★★★黄金原则：不管有多少人共同参与同一项目，一定要确保每一行代码都像是同一个人编写的。★★★

## yogoo-w22-template

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
yogoo-w22-template
├─ .browserslistrc
├─ .env
├─ .env.development
├─ .env.production
├─ .gitignore
├─ babel.config.js
├─ doc
│  └─ w22架构.mmap
├─ mock
│  ├─ index.ts
│  ├─ modules
│  │  ├─ menu.ts
│  │  ├─ user.ts
│  │  └─ _institution.ts
│  ├─ resultEnum.ts
│  ├─ typing.ts
│  └─ _util.ts
├─ msdos.bat
├─ package.json
├─ public
│  ├─ css
│  │  └─ reset.css
│  ├─ favicon.ico
│  └─ index.html
├─ README.md
├─ run.bat
├─ src
│  ├─ api
│  │  ├─ api-type.ts
│  │  ├─ menu.ts
│  │  ├─ model
│  │  │  └─ userModel.ts
│  │  ├─ test.ts
│  │  └─ user.ts
│  ├─ App.vue
│  ├─ assets
│  │  ├─ images
│  │  │  ├─ backup
│  │  │  │  ├─ logo-mini@2x.png
│  │  │  │  └─ logo@2x.png
│  │  │  ├─ logo-mini@2x.png
│  │  │  └─ logo@2x.png
│  │  ├─ login_images
│  │  │  └─ background.png
│  │  └─ logo.png
│  ├─ components
│  │  ├─ Application
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ AppProvider.vue
│  │  │     ├─ search
│  │  │     │  ├─ AppSearch.vue
│  │  │     │  ├─ AppSearchFooter.vue
│  │  │     │  ├─ AppSearchKeyItem.vue
│  │  │     │  ├─ AppSearchModal.vue
│  │  │     │  └─ useMenuSearch.ts
│  │  │     └─ useAppContext.ts
│  │  ├─ Basic
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ BasicArrow.vue
│  │  │     ├─ BasicHelp.vue
│  │  │     └─ BasicTitle.vue
│  │  ├─ Breadcrumb
│  │  │  └─ index.vue
│  │  ├─ Container
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ collapse
│  │  │     │  ├─ CollapseContainer.vue
│  │  │     │  └─ CollapseHeader.vue
│  │  │     ├─ scroll
│  │  │     │  └─ ScrollContainer.vue
│  │  │     └─ typing.ts
│  │  ├─ Description
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     └─ Description.vue
│  │  ├─ Drawer
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ Drawer.vue
│  │  │     └─ DrawerHeader.vue
│  │  ├─ Form
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ BasicForm.vue
│  │  │     ├─ components
│  │  │     │  ├─ MDate.vue
│  │  │     │  ├─ MInput.vue
│  │  │     │  └─ MSelect.vue
│  │  │     ├─ GenerateRules.ts
│  │  │     └─ hooks.ts
│  │  ├─ Hamburger
│  │  │  └─ index.vue
│  │  ├─ LockScreen
│  │  │  ├─ index.vue
│  │  │  └─ useNow.ts
│  │  ├─ Page
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     └─ PageWrapper.vue
│  │  ├─ Screenfull
│  │  │  └─ index.vue
│  │  ├─ SvgIcon
│  │  │  └─ index.vue
│  │  ├─ Transition
│  │  │  ├─ index.ts
│  │  │  └─ src
│  │  │     ├─ CollapseTransition.vue
│  │  │     ├─ CreateTransition.tsx
│  │  │     └─ ExpandTransition.ts
│  │  └─ Windows
│  │     ├─ index.ts
│  │     └─ src
│  │        └─ WindowWrapper.vue
│  ├─ config
│  │  ├─ cli.config.ts
│  │  ├─ index.ts
│  │  ├─ net.config.ts
│  │  └─ setting.config.ts
│  ├─ directives
│  │  └─ clickOutside.ts
│  ├─ enums
│  │  ├─ appEnum.ts
│  │  ├─ breakpointEnum.ts
│  │  ├─ cacheEnum.ts
│  │  ├─ exceptionEnum.ts
│  │  ├─ httpEnum.ts
│  │  ├─ menuEnum.ts
│  │  ├─ pageEnum.ts
│  │  └─ roleEnum.ts
│  ├─ hooks
│  │  ├─ component
│  │  │  └─ usePageContext.ts
│  │  ├─ core
│  │  │  ├─ onMountedOrActivated.ts
│  │  │  ├─ useAttrs.ts
│  │  │  ├─ useContext.ts
│  │  │  ├─ useLockFn.ts
│  │  │  ├─ useRefs.ts
│  │  │  └─ useTimeout.ts
│  │  ├─ event
│  │  │  ├─ useBreakpoint.ts
│  │  │  ├─ useEventListener.ts
│  │  │  ├─ useIntersectionObserver.ts
│  │  │  ├─ useScroll.ts
│  │  │  ├─ useScrollTo.ts
│  │  │  └─ useWindowSizeFn.ts
│  │  ├─ setting
│  │  │  ├─ index.ts
│  │  │  └─ useRootSetting.ts
│  │  └─ web
│  │     ├─ useContentHeight.ts
│  │     ├─ useDesign.ts
│  │     ├─ useMessage.ts
│  │     ├─ useMessageBox.ts
│  │     ├─ useNotification.ts
│  │     ├─ usePage.ts
│  │     └─ useWindow.ts
│  ├─ icons
│  │  ├─ index.ts
│  │  ├─ svg
│  │  │  ├─ 404.svg
│  │  │  ├─ bug.svg
│  │  │  ├─ chart.svg
│  │  │  ├─ clipboard.svg
│  │  │  ├─ component.svg
│  │  │  ├─ dashboard.svg
│  │  │  ├─ documentation.svg
│  │  │  ├─ drag.svg
│  │  │  ├─ edit.svg
│  │  │  ├─ education.svg
│  │  │  ├─ email.svg
│  │  │  ├─ example.svg
│  │  │  ├─ excel.svg
│  │  │  ├─ exit-fullscreen.svg
│  │  │  ├─ eye-open.svg
│  │  │  ├─ eye.svg
│  │  │  ├─ form.svg
│  │  │  ├─ fullscreen.svg
│  │  │  ├─ guide.svg
│  │  │  ├─ icon.svg
│  │  │  ├─ international.svg
│  │  │  ├─ language.svg
│  │  │  ├─ link.svg
│  │  │  ├─ list.svg
│  │  │  ├─ lock.svg
│  │  │  ├─ message.svg
│  │  │  ├─ money.svg
│  │  │  ├─ nested.svg
│  │  │  ├─ password.svg
│  │  │  ├─ pdf.svg
│  │  │  ├─ people.svg
│  │  │  ├─ peoples.svg
│  │  │  ├─ qq.svg
│  │  │  ├─ search.svg
│  │  │  ├─ shopping.svg
│  │  │  ├─ size.svg
│  │  │  ├─ skill.svg
│  │  │  ├─ star.svg
│  │  │  ├─ tab.svg
│  │  │  ├─ table.svg
│  │  │  ├─ theme.svg
│  │  │  ├─ tree-table.svg
│  │  │  ├─ tree.svg
│  │  │  ├─ user.svg
│  │  │  ├─ wechat.svg
│  │  │  └─ zip.svg
│  │  └─ svgo.yml
│  ├─ layouts
│  │  ├─ default
│  │  │  ├─ aside
│  │  │  │  ├─ index.vue
│  │  │  │  └─ src
│  │  │  │     └─ c-menus.vue
│  │  │  ├─ content
│  │  │  │  └─ useContentViewHeight.ts
│  │  │  ├─ header
│  │  │  │  └─ index.vue
│  │  │  └─ tags
│  │  │     └─ index.vue
│  │  ├─ layout.vue
│  │  └─ layoutEmpty.vue
│  ├─ main.ts
│  ├─ router
│  │  ├─ constant.ts
│  │  ├─ guard
│  │  │  ├─ index.ts
│  │  │  └─ permissionGuard.ts
│  │  ├─ index.ts
│  │  ├─ routes
│  │  │  ├─ basic.ts
│  │  │  ├─ index.ts
│  │  │  ├─ mainOut.ts
│  │  │  └─ modules
│  │  │     ├─ about.ts
│  │  │     ├─ demo
│  │  │     │  ├─ comp
│  │  │     │  │  ├─ basic
│  │  │     │  │  │  └─ basic.ts
│  │  │     │  │  ├─ button
│  │  │     │  │  │  └─ button.ts
│  │  │     │  │  ├─ checkbox
│  │  │     │  │  │  └─ checkbox.ts
│  │  │     │  │  ├─ date-picker
│  │  │     │  │  │  └─ date-picker.ts
│  │  │     │  │  ├─ datetime-picker
│  │  │     │  │  │  └─ datetime-picker.ts
│  │  │     │  │  ├─ dialog
│  │  │     │  │  │  └─ dialog.ts
│  │  │     │  │  ├─ drawer
│  │  │     │  │  │  └─ drawer.ts
│  │  │     │  │  ├─ form
│  │  │     │  │  │  ├─ basic
│  │  │     │  │  │  │  └─ basicForm.ts
│  │  │     │  │  │  └─ dynamic
│  │  │     │  │  │     └─ dynamicform.ts
│  │  │     │  │  ├─ input
│  │  │     │  │  │  └─ input.ts
│  │  │     │  │  ├─ progress
│  │  │     │  │  │  └─ progress.ts
│  │  │     │  │  ├─ radio
│  │  │     │  │  │  └─ radio.ts
│  │  │     │  │  ├─ slider
│  │  │     │  │  │  └─ slider.ts
│  │  │     │  │  ├─ switch
│  │  │     │  │  │  └─ switch.ts
│  │  │     │  │  ├─ time-picker
│  │  │     │  │  │  └─ time-picker.ts
│  │  │     │  │  ├─ timeline
│  │  │     │  │  │  └─ timeline.ts
│  │  │     │  │  └─ timeselect
│  │  │     │  │     └─ timeselect.ts
│  │  │     │  └─ func
│  │  │     │     ├─ dynamic-routing
│  │  │     │     │  └─ dynamic-routing.ts
│  │  │     │     ├─ icons
│  │  │     │     │  └─ icons.ts
│  │  │     │     ├─ msg
│  │  │     │     │  └─ msg.ts
│  │  │     │     └─ session-timeout
│  │  │     │        └─ index.ts
│  │  │     └─ home.ts
│  │  └─ types.ts
│  ├─ settings
│  │  ├─ designSetting.ts
│  │  ├─ projectSetting.ts
│  │  └─ siteSetting.ts
│  ├─ shims-vue.d.ts
│  ├─ store
│  │  ├─ index.ts
│  │  └─ modules
│  │     ├─ app.ts
│  │     ├─ cache.ts
│  │     ├─ errorLog.ts
│  │     ├─ lock.ts
│  │     ├─ multipleTab.ts
│  │     ├─ permission.ts
│  │     ├─ todo.ts
│  │     ├─ user.ts
│  │     └─ window.ts
│  ├─ styles
│  │  ├─ btn.less
│  │  ├─ element-ui.less
│  │  ├─ element-variables.less
│  │  ├─ index.less
│  │  ├─ mixin.less
│  │  ├─ sidebar.less
│  │  ├─ transition.less
│  │  └─ variables.less
│  ├─ utils
│  │  ├─ auth
│  │  │  └─ index.ts
│  │  ├─ cache
│  │  │  ├─ index.ts
│  │  │  └─ persistent.ts
│  │  ├─ dateUtil.ts
│  │  ├─ domUtils.ts
│  │  ├─ env.ts
│  │  ├─ event
│  │  │  └─ index.ts
│  │  ├─ helper
│  │  │  ├─ menuHelper.ts
│  │  │  ├─ routeHelper.ts
│  │  │  ├─ treeHelper.ts
│  │  │  └─ tsxHelper.tsx
│  │  ├─ http
│  │  │  ├─ checkStatus.ts
│  │  │  ├─ httpService.ts
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  ├─ is.ts
│  │  ├─ log.ts
│  │  ├─ propTypes.ts
│  │  ├─ sysMsg.ts
│  │  ├─ uuid.ts
│  │  └─ validate.ts
│  └─ views
│     ├─ About.vue
│     ├─ dashboard
│     │  └─ analysis
│     │     ├─ components
│     │     │  └─ GrowCard.vue
│     │     └─ index.vue
│     ├─ demo
│     │  ├─ comp
│     │  │  ├─ basic
│     │  │  │  └─ index.vue
│     │  │  ├─ button
│     │  │  │  └─ index.vue
│     │  │  ├─ checkbox
│     │  │  │  └─ index.vue
│     │  │  ├─ date-picker
│     │  │  │  └─ index.vue
│     │  │  ├─ datetime-picker
│     │  │  │  └─ index.vue
│     │  │  ├─ dialog
│     │  │  │  └─ index.vue
│     │  │  ├─ drawer
│     │  │  │  └─ index.vue
│     │  │  ├─ form
│     │  │  │  ├─ basic
│     │  │  │  │  └─ index.vue
│     │  │  │  └─ dynamic
│     │  │  │     └─ index.vue
│     │  │  ├─ input
│     │  │  │  └─ index.vue
│     │  │  ├─ progress
│     │  │  │  └─ index.vue
│     │  │  ├─ radio
│     │  │  │  └─ index.vue
│     │  │  ├─ slider
│     │  │  │  └─ index.vue
│     │  │  ├─ switch
│     │  │  │  └─ index.vue
│     │  │  ├─ time-picker
│     │  │  │  └─ index.vue
│     │  │  ├─ timeline
│     │  │  │  └─ index.vue
│     │  │  └─ timeselect
│     │  │     └─ index.vue
│     │  ├─ function
│     │  │  ├─ dynamic-routing
│     │  │  │  └─ index.vue
│     │  │  ├─ icons
│     │  │  │  ├─ element-icons.ts
│     │  │  │  ├─ index.vue
│     │  │  │  └─ svg-icons.ts
│     │  │  ├─ msg
│     │  │  │  └─ index.vue
│     │  │  └─ session-timeout
│     │  │     └─ index.vue
│     │  ├─ page
│     │  │  ├─ insideRouter
│     │  │  │  ├─ children
│     │  │  │  │  ├─ c1.vue
│     │  │  │  │  ├─ c2.vue
│     │  │  │  │  ├─ c3.vue
│     │  │  │  │  └─ children
│     │  │  │  │     ├─ cc1.vue
│     │  │  │  │     ├─ cc2.vue
│     │  │  │  │     └─ cc3.vue
│     │  │  │  └─ index.vue
│     │  │  └─ level
│     │  │     ├─ level1-1
│     │  │     │  └─ level1-1-1
│     │  │     │     └─ index.vue
│     │  │     └─ level1-2
│     │  │        └─ level1-2-1
│     │  │           └─ index.vue
│     │  └─ permission
│     │     └─ operation
│     │        └─ index.vue
│     ├─ Home.vue
│     ├─ login
│     │  └─ index.vue
│     └─ sys
│        ├─ about
│        │  └─ index.vue
│        ├─ exception
│        │  └─ Exception.vue
│        └─ redirect
│           └─ index.vue
├─ tsconfig.json
├─ types
│  ├─ axios.d.ts
│  ├─ config.d.ts
│  ├─ global.d.ts
│  ├─ index.d.ts
│  ├─ store.d.ts
│  └─ vue-router.d.ts
├─ vue.config.js
├─ yarn.lock
├─ 修改日志.txt
└─ 请先读我.txt

```
