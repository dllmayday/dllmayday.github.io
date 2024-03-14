---
title: vmware-ubuntu使用问题解决
permalink: 
categories: 
- 技术分享
- 实用技巧
tags: vmware
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 17:00:32
---


## 无法联网
sudo service network-manager stop
sudo rm /var/lib/NetworkManager/NetworkManager.state
sudo service network-manager start

sudo gedit /etc/NetworkManager/NetworkManager.conf
把 managed =false改成true

## 磁盘空间压缩

sudo /usr/bin/vmware-toolbox-cmd disk list
sudo /usr/bin/vmware-toolbox-cmd disk shrink /


## ubuntu系统安装中文输入法
一. 安装输入法
下面任选一种即可：

IBus拼音：sudo apt-get install ibus-pinyin （命令解释：sudo 以超级权限去执行，apt-get install 安装一个新软件包 ibus-pinyin软件包名称）
谷歌拼音输入法：sudo apt-get install ibus-googlepinyin
Sun拼音输入法：sudo apt-get install ibus-sunpinyin
二.配置输入法：
终端里面输入ibus-setup，输入法的配置界面就会弹出，IBus Preference设置被打开。我们在Input Method选项卡中，选择自己喜欢的输入方式，并配置自己喜欢的快捷键即可。
注意：如果发现切换中英文的小图标在左上角没有出现，可以打开系统设置在地区和语言中添加Chinese（pinyin）就会显示


若以上步骤无效时，参考一下步骤：
打开命令行依次输入：

sudo apt-get install ibus ibus-clutter ibus-gtk ibus-gtk3 ibus-qt4
启动：im-config -s -ibus
安装pinyin引擎：sudo apt-get install ibus-pinyin
打开设置：ibus-setup，添加pinyin

## VMware 上使用 Ubuntu 20 虚拟机时无法显示共享磁盘的问题解决

VMware Tools 安装： 确保您已经在 Ubuntu 20 虚拟机中安装了 VMware Tools。VMware Tools 提供了一些增强功能，包括共享文件夹的支持。您可以在 VMware 虚拟机菜单中找到安装 VMware Tools 的选项。

共享文件夹设置： 在 VMware 虚拟机设置中，确保已正确配置共享文件夹。您可以通过编辑虚拟机设置，然后在 “选项” 标签卡下选择 “共享文件夹” 来配置共享文件夹。

检查权限： 确保您在 Ubuntu 中有足够的权限访问共享文件夹。确保您的用户属于正确的用户组，并且有权限读取和写入共享文件夹。

重新挂载共享文件夹： 在 Ubuntu 中，您可以尝试重新挂载共享文件夹。使用以下命令：

sudo vmware-hgfsclient
sudo vmhgfs-fuse .host:/ /mnt/hgfs/ -o allow_other
1
2
这将共享文件夹挂载到 /mnt/hgfs/ 目录中。请确保该目录存在。

查看日志： 检查 VMware Tools 的日志文件，看是否有关于共享文件夹的错误或警告。您可以在 /var/log/vmware-tools 目录中找到这些日志文件。

<hr />
版权信息