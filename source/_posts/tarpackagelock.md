---
title: tar包加密
permalink: 
categories: 实用技巧
tags: tar
description: 
image: 
copyright: true     
date: 2024-02-20 16:28:12
---

## 打包&加密
```
tar -zcvf - cc | openssl des3 -salt -k [passwd] | dd of=[package_name].des3
```


## 解密&解包
```
dd if=[package_name].des3 | openssl des3 -d -k [passwd]  | tar zxf -
```

<hr />
版权信息