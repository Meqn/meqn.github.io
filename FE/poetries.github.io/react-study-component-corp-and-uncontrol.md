---
title: React之组件的协同及（不）可控组件（五）
date: 2017-11-19 01:10:24
tags: 
 - JavaScript
 - react
categories: Front-End
---

一、为什么要进行组件的协同
---

- 我们在实际的开发项目的时候，不会只用几个组件，有时候遇到大型的项目，可能会有成千上百的组件，难免会遇到有功能重复的组件。要进行修改，就会修改大部分的文件。所以我们需要进行组件的协同开发。

![image.png](http://upload-images.jianshu.io/upload_images/1480597-ca3cbaafe961fa83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


二、什么是组件的协同使用？
---

- 组件的协同本质上是对组件的一种组织、管理的方式。
- 目的：
  - 逻辑清晰：这是组件与组件之间的逻辑
  - 代码模块化
  - 封装细节：像面向对象一样将常用的方法以及数据封装起来
  - 提高代码的复用性：因为是组件，相当于一个封装好的东西，用的时候直接调用

三、如何实现组件的协同使用
---

- 第一种：增加一个父组件，将其他的组件进行嵌套，更多的是实现代码的封装
- 第二种：通过一些操作从后台获取数据，`React`中的`Mixin`，更多的是实现代码的复用

四、组件嵌套的含义
---

- 组件嵌套的本质是父子关系

![image.png](http://upload-images.jianshu.io/upload_images/1480597-dc00c2b2c9ac3807.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

五、组件嵌套的优缺点
---

- 优点：
  - 逻辑清晰：父子关系类似于人类中的父子关系
  - 模块化开发：每个模块对应一个功能，不同的模块可以同步开发
  - 封装细节：开发者必须要关注组件的功能，不需要了解细节
- 缺点：
  - 编写难度高：父子组件的关系需要经过深思熟虑，贸然编写可能导致关系混乱，代码难以维护
  - 无法掌握所有细节：使用者只知道组件的用法，不知道实现细节，遇到问题难以修复
  
六、Mixin
---

**Mixin的含义**

- `Mixin=一组方法`。
- 他的目的是横向抽离出组件的相似代码，把组件的共同作用以及效果的代码提出来

![image.png](http://upload-images.jianshu.io/upload_images/1480597-ceca4b322b820239.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**Mixin的优缺点**

- 优点
  - 代码复用：抽离出通用的代码，减少开发成本，提高开发效率
  - 即插即用：可以使用许多现有的`Mixin`来开发自己的代码
  - 适应性强：改动一次代码，影响多个组件
- 缺点
  - 编写难度高：`Mixin`可能被用在各种环境中，想要兼容多种环境就需要更多的  - 码与逻辑，通用的代价是提高复杂度
  - 降低代码的可读性：组件的优势在于将逻辑与是界面直接结合在一起，`Mixin`本质上会分散逻辑，理解起来难度大

七、不可控组件
---

![image.png](http://upload-images.jianshu.io/upload_images/1480597-34b3ac31175733e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 上图：`defaultValue`的值是固定的，这就是一个不可控组件
- 如果要获取`input`的`value`值，只有使用`ref`获取节点来获取值

八、可控组件
---

![image.png](http://upload-images.jianshu.io/upload_images/1480597-daeeefc5cd7c054d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `defaultValue`的值是根据状态确定了，只需要拿到`this.state.value`的值就可以了
- 这里需要注意一下：使用`value`的值是不可修改的，`defaultValue`的值是可以修改的

**可控组件的优点**

- 符合`React`的数据流
- 数据存储在`state`中，便于获取
- 便于处理数据
