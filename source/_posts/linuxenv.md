---
title: Linux中修改环境变量及生效方法
permalink: 
categories: 实用技巧
tags: 环境变量
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-21 10:47:55
---

Linux中修改环境变量及生效方法如下：
## 方法一：  /etc/profile所有用户永久生效

在/etc/profile文件中添加变量,此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行;并从/etc/profile.d目录的配置文件中搜集shell的设置
用vim在文件/etc/profile文件中增加变量，该变量将会对Linux下所有用户有效，并且是“永久的”。  

<!--more-->
例如:编辑/etc/profile文件，添加CLASSPATH变量
添加一行:
```
export CLASSPATH=./JAVA_HOME/lib;$JAVA_HOME/jre/lib
```
要让刚才的修改马上生效，需要执行以下代码  
```
source /etc/profile  
```
## 方法二：/etc/bashrc所有用户永久生效

为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取。 编辑方法如上，不再赘述
  
## 方法三 ~/.bash_profile仅对当前用户永久有效：  

在~/.bash_profile文件中增加变量【对单一用户生效（永久的）】, 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次。 
用vim在用户目录下的.bash_profile文件中增加变量，改变量仅会对当前用户有效，并且是“永久的”。  
修改后需要执行重新登录才能生效，也可以执行命令source /etc/profile立即生效
```
source .bash_profile  
```
  
## 方法四  ~/.bashrc仅会对当前用户有效：

在~/.bashrc文件中增加专用于当前用户的bashshell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取。
编辑方法如上，不再赘述
***另外，.bashrc等中设定的变量(局部)只能继承/etc/profile中的变量,他们是"父子"关系***

## 方法四：  

直接运行export命令定义变量【只对当前shell（BASH）有效（临时的）】  
在shell的命令行下直接使用[export  变量名=变量值]定义变量，该变量只在当前的shell（BASH）或其子shell（BASH）下是有效的，shell关闭了，变量也就失效了，再打开新shell时就没有这个变量，需要使用的话还需要重新定义。  

例如：
```
export PATH=/usr/local/webserver/php/bin:$PATH  
```

<hr />
版权信息