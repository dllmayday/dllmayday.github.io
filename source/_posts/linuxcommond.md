---
title: linuxcommond
permalink: 
categories: 实用技巧
tags: Linux
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 17:05:53
---

Linux 命令行使用 

<!--more-->

## 磁盘占用
```
//默认显示系统所有的磁盘情况
//(-h 参数同样是为了提高可读性，-s 代表summary，只显示总大小)
df -h

//(-h 参数同样是为了提高可读性，-s 代表summary，只显示总大小)
//默认显示当前目录下所有文件和文件夹的总大小。
du -sh

``` 
## 依赖
1. 查看依赖的库：
```
objdump -x xxx.so | grep NEEDED
```
2. 查看可执行程序依赖的库：
```
objdump -x 可执行程序名 | grep NEEDED
```
3. 查看库导出函数
```
objdump -tT xxx.so
nm -D xxx.so
```
查看符号表 地址：
```
objdump -tT libName.so | grep symbel symbolName
nm -D libName.so | grep symbel symbolName
```

4. 查看缺少的库：
```
ldd xxx.so
```
5. 查看库版本编译等信息：
strings  xxx.so



<hr />
版权信息