---
title: WSL图像界面安装
permalink: 
categories: 实用技巧
tags: WSL
description: //文章描述
image: //自定义的文章摘要图片，只在页面展示，文章内消失
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 18:12:32
---

WSL图像界面安装教程

<!--more-->

1.  安装WSL

2.  换源
    参考另一篇文章[https://www.cnblogs.com/bosslv/p/11006680.html](https://www.cnblogs.com/bosslv/p/11006680.html)

3.  修改$PATH，默认会把windows的PATH也加入WSL中，不需要的话可以删除

    ```
    sudo vim ~/.bashrc
    ```

    末尾加入如下代码
    `PATH=$(/usr/bin/printenv PATH | /usr/bin/perl -ne 'print join(":", grep { !/\/mnt\/[a-z]/ } split(/:/));')`

4.  设置中文环境
    1.  下载中文语言包

        ```
        sudo apt-get install language-pack-zh-han*
        ```

    2.  编辑配置文件

        ```
        sudo vim /etc/profile
        ```

        末尾加入

        ```
        export LANG=zh_CN.utf8
        export LC_ALL=zh_CN.utf8
        ```

    3.  添加中文字体`sudo apt-get install fonts-noto-cjk`

    4.  重启

5.  安装图形界面
    1.  windows下载安装VcXsrv，地址[https://sourceforge.net/projects/vcxsrv/](https://sourceforge.net/projects/vcxsrv/)
    2.  WSL安装xfce4

        ```
        sudo apt-get install --assume-yes xfce4 xorg-dev libopencc2 libopencc2-data libqt4-opengl libqtwebkit4 unzip zip
        ```

    3.  设置配置文件`~/.bashrc`

        ```
        echo "export DISPLAY=:0.0" >> ~/.bashrc
        ```

    4.  重启WSL
    5.  Windows上打开XLaunch
    6.  WSL输入`$ startxfce4`
    7.  如果桌面显示出现问题，在WSL中执行

        ```
        rm -rf ~/.config/xfce4
        rm -rf ~/.cache/sessions
        ```


<hr />
版权信息