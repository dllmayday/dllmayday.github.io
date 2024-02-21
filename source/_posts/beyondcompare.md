---
title: Beyond Compare密钥失效解决
permalink: 
categories: 
- 技术分享
- 实用技巧
tags: Beyond Compare
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 17:02:40
---

查找路径
C:\Users\<用户名>\AppData\Roaming\Scooter Software\Beyond Compare 4
删除除BC4Key.txt外所有文件
<article class="baidu_pl" style="box-sizing: inherit; outline: 0px; display: block; position: relative; padding-top: 16px;">
第二种办法
删除C:\Program Files\Beyond Compare 4\BCUnrar.dll（安装目录下的BCUnrar.dll文件]），这个文件重命名或者直接删除。

第三种办法
修改注册表
1、在搜索栏中输入 regedit ，打开注册表
2、删除项目CacheId ：
HKEY_CURRENT_USER\Software\Scooter Software\Beyond Compare 4\CacheId


<hr />
版权信息