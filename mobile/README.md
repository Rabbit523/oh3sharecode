# Ionic 2 Conference Application

事务协作系统
版本规定：[框架].[单位].[补丁] 
 第一位 表示框架版本 ionic native有所改变的时候这个版本号要改
 第二位 表示不同的单位(0-襄阳机务段,1-接触网管理,2-石开万众,3-消防大检查,4-大功率事务,5-哈尔滨视频系统,6-安全问题库)
 第一位 表示每次补丁的修改

## Important!
公用core层 不同单位的文件位于mobile下的buildconfig中 编辑的时候会自动拷贝

## Table of Contents
 - [Getting Started](#getting-started)
 - [Contributing](#contributing)
 - [Use Cases](#use-cases)
 - [App Preview](#app-preview)
 - [File Structure of App](#file-structure-of-app)

## Use Cases

* Action Sheet - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.html) | [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.ts) ]
* Alert - [ [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Cards - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/speaker-list/speaker-list.html) ]
* Datetime - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/about/about.html) ]
* Grid - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/login/login.html) ]
* Inputs - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/login/login.html) ]
* Items (Sliding) - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) | [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Menu - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/app/app.template.html) |
[code](https://github.com/driftyco/ionic-conference-app/blob/master/src/app/app.component.ts) ]
* Modal - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule-filter/schedule-filter.html) | [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Searchbar - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) | [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Segment - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) | [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]
* Slides - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/tutorial/tutorial.html) |
* Sticky headers - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.html) ]
* Tabs - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/tabs/tabs.html) | [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/tabs/tabs.ts) ]
* Toggle - [ [template](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule-filter/schedule-filter.html) ]
[code](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/tutorial/tutorial.ts) ]
* Using Angular HTTP for JSON - [ [code](https://github.com/driftyco/ionic-conference-app/blob/master/src/providers/conference-data.ts) | [usage](https://github.com/driftyco/ionic-conference-app/blob/master/src/pages/schedule/schedule.ts) ]


## App Preview

1. core.sh  编译通用模块
2. mobile.sh [company] 运行对应单位的程序

## File Structure of App

```
ionic-conference-app/
├-- .github/                            * GitHub files
│   ├── CONTRIBUTING.md                 * Documentation on contributing to this repo
│   └── ISSUE_TEMPLATE.md               * Template used to populate issues in this repo
|
|-- resources/
|
|-- src/
|    |-- app/
|    |    ├── app.component.ts
|    |    └── app.module.ts
|    |    └── app.template.html
|    |    └── main.ts
|    |
```
