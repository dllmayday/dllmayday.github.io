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

<hr />
版权信息