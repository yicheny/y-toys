[TOC]

## `LocalStorage`实现
- LocalDB
  - [x] 初始化
  - [x] get、set、remove、clear
  - [x] createStore 
- LocalTable
  - [x] 初始化
  - [x] addOne、addMany
  - [x] updateOne、updateMany
  - [x] deleteOne、deleteMany
  - [x] clear
  - [x] 语法糖：setOne、setMany
  - [ ] 通过`ajv`(json-schema)约束数据
  - [ ] 支持组合主键
- 单元测试
  - [x] mockStorage
  - [x] LocalDB
  - [x] LocalTable
- 浏览器环境测试
  - [ ] 模拟页面切换存储
  - [ ] 模拟页面配置修改
  - [ ] 模拟用户切换存储
- [ ] 说明文档编写 

## `IndexDB`
