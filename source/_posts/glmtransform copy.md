---
title: GLM矩阵变换
permalink: 
categories: 
- 技术分享
- 数学
tags: GLM
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-21 11:18:18
---

变换方式包括旋转、平移、缩放。

当多种变化叠加影响时按照从后到前的方式进行运算

矩阵运算不满足交换律

<!--more-->

例如:
从移动，再绕z轴逆时针旋转一个角度，最后将其缩放0.5倍
```
glm::mat4 trans(1.0f);
trans = glm::scale(trans, glm::vec3(0.5,0.5,0.5));
trans=  glm::rotate(trans,M_PI/2,glm::vec3(0.0,0.0,1.0));
trans=  glm::transform(trans,glm::vec3(0.5,0.5,0.5));
```
或者写作如下方式
```
glm::mat4 identity(1.0f);
glm::mat4 scalmat= glm::scale(identity, glm::vec3(0.5,0.5,0.5));
glm::mat4 rotatemat=  glm::rotate(identity,M_PI/2,glm::vec3(0.0,0.0,1.0));
glm::mat4 transformmat=  glm::transform(identity,glm::vec3(0.5,0.5,0.5));
trans =scalmat * rotatemat *transformmat; 
```

<hr />
版权信息