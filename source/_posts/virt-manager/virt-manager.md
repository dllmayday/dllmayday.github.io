---
title: virt-manager虚拟机安装
permalink:
categories: 
- 技术分享
- virtual-machine
tags: 虚拟机
description: 
image: 
copyright: true     
date: 2025-02-14 15:31:07
---

## virt-manager简介
virt-manager 应用程序是一个桌面用户界面，用于通过 libvirt 管理虚拟机。它主要针对 KVM VM，但也管理 Xen 和 LXC（Linux 容器）。它提供了正在运行的域的摘要视图、它们的实时性能和资源利用率统计信息。向导支持创建新域，以及配置和调整域的资源分配和虚拟硬件。嵌入式 VNC 和 SPICE 客户端查看器为来宾域提供了完整的图形控制台

## 安装使用

<!--more-->

1.检查CPU虚拟化支持
首先，确认你的CPU支持硬件虚拟化技术（Intel VT或AMD-V）。可以通过执行以下命令来检查
```
egrep -c '(vmx|svm)'/proc/cpuinfo
```
2.安装KVM和QEMU
在确认硬件支持虚拟化之后，确保KVM和QEMU已经安装。可以通过以下命令安装：
```
sudo apt-get update 
sudo apt-get installqemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
```
这些命令会安装KVM，QEMU，以及其他必要的虚拟化管理工具和库。
3.启动和检查Libvirt服务状态
安装完成后，需要确保 libvirtd服务（或在某些系统中叫 libvirt-bin）正在运行。使用以下命令检查服务状态：
```
sudosystemctl status libvirtd
sudosystemctl start libvirtd
sudo systemctl enable libvirtd
```
4.配置用户权限
确保你的用户账号被加入到 libvirt和 kvm用户组，允许无密码管理虚拟机：
检查用户是否属于 libvirt 组：
```
 groups
```
如果没有，使用以下命令将当前用户添加到 libvirt 组
```
sudo usermod -a -G libvirt $(whoami) 

sudo usermod -a -Gkvm $(whoami)
```
然后注销并重新登录，或者运行以下命令来更新组信息
```
newgrp libvirt
``` 
libvirt 报错Failed toconnect to socket to '/var/run/libvirt/libvirt-sock':Permission dinied解决方案
这个错误提示说明libvirt 无法连接到 Unix 套接字/var/run/libvirt/libvirt-sock，可能是由于权限问题导致的。你可以尝试以下几种方法来解决问题：
（1）检查用户权限
     如上第四步
（2）检查套接字文件权限
检查/var/run/libvirt/libvirt-sock 的权限，确保当前用户有读取和写入权限：
```
ls-l/var/run/libvirt/libvirt-sock
```
如果权限不正确，可以通过以下命令修改：
```
sudo chmod 666 /var/run/libvirt/libvirt-sock
```
5.安装镜像 
点击添加连接，可按照默认配置，点击连接后确保连接成功

![添加连接](../images/virt-manager-1.png)
选择新建虚拟机，本地安装介质后选择虚拟机镜像开始安装

 ![新建虚拟机](../images/virt-manager-2.png)
参考资料：
https://www.8kiz.cn/archives/16478.html
https://www.cnxclm.com/read-3204-1.html
https://zhuanlan.zhihu.com/p/83331819


<hr />
版权信息