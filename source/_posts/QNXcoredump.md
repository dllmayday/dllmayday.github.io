---
title: QNX下位机coredump调试
permalink: 
categories: 
- 技术分享
- Debug
tags: Debug
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-21 15:14:50
---

[引用地址](https://blog.csdn.net/jean_bai/article/details/44747659)
##什么是coredump？

通常情况下coredmp包含了程序运行时的内存，寄存器状态，堆栈指针，内存管理信息等。可以理解为把程序工作的当前状态存储成一个文件。许多程序和操作系统出错时会自动生成一个core文件
##如何使用coredump？
coredump可以用在很多场合，使用Linux或者solaris的人可能都有过这种经历，系统在跑一些压力测试或者系统负载一大的话，系统就hang住了或者干脆system panic.这时唯一能帮助你分析和解决问题的就是coredump了。
现在很多应该程序出错时也会出现coredump.

<!--more-->

##分析coredump的工具
现在大部分类unix操作系统都提供了分析core文件的工具，比如 GNU Binutils Binary File Descriptor library (BFD),GNU Debugger (gdb），mdb等。
coredump的文件格式
类unix操作系统中使用efi格式保存coredump文件。
造成程序coredump的原因很多，这里根据以往的经验总结一下：
1. 内存访问越界
  a) 由于使用错误的下标，导致数组访问越界
  b) 搜索字符串时，依靠字符串结束符来判断字符串是否结束，但是字符串没有正常的使用结束符
  c) 使用strcpy, strcat, sprintf, strcmp, strcasecmp等字符串操作函数，将目标字符串读/写爆。应该使用strncpy, strlcpy, strncat, strlcat, snprintf, strncmp, strncasecmp等函数防止读写越界。
2. 多线程程序使用了线程不安全的函数。
应该使用下面这些可重入的函数，尤其注意红色标示出来的函数，它们很容易被用错：
asctime_r(3c) gethostbyname_r(3n) getservbyname_r(3n) ctermid_r(3s) gethostent_r(3n) getservbyport_r(3n) ctime_r(3c) getlogin_r(3c) getservent_r(3n) fgetgrent_r(3c) getnetbyaddr_r(3n) getspent_r(3c) fgetpwent_r(3c) getnetbyname_r(3n) getspnam_r(3c) fgetspent_r(3c) getnetent_r(3n) gmtime_r(3c) gamma_r(3m) getnetgrent_r(3n) lgamma_r(3m) getauclassent_r(3) getprotobyname_r(3n) localtime_r(3c) getauclassnam_r(3) etprotobynumber_r(3n) nis_sperror_r(3n) getauevent_r(3) getprotoent_r(3n) rand_r(3c) getauevnam_r(3) getpwent_r(3c) readdir_r(3c) getauevnum_r(3) getpwnam_r(3c) strtok_r(3c) getgrent_r(3c) getpwuid_r(3c) tmpnam_r(3s) getgrgid_r(3c) getrpcbyname_r(3n) ttyname_r(3c) getgrnam_r(3c) getrpcbynumber_r(3n) gethostbyaddr_r(3n) getrpcent_r(3n).
3. 多线程读写的数据未加锁保护。
对于会被多个线程同时访问的全局数据，应该注意加锁保护，否则很容易造成core dump
4. 非法指针
  a) 使用空指针
  b) 随意使用指针转换。一个指向一段内存的指针，除非确定这段内存原先就分配为某种结构或类型，或者这种结构或类型的数组，否则不要将它转换为这种结构或类型 的指针，而应该将这段内存拷贝到一个这种结构或类型中，再访问这个结构或类型。这是因为如果这段内存的开始地址不是按照这种结构或类型对齐的，那么访问它 时就很容易因为bus error而core dump.
5. 堆栈溢出
不要使用大的局部变量（因为局部变量都分配在栈上），这样容易造成堆栈溢出，破坏系统的栈和堆结构，导致出现莫名其妙的错误。
##coredump文件的生成方法以及使用方法：
（假设在x86上交叉编译，而在arm上运行异常的现象）
1． 在arm内核里加入coredump的支持（一般内核都支持coredump,不用重编）
2． 运行命令，此时允许coredump文件产生：(在arm上)
```
 ulimit –cunlimited
```
3． 执行程序：（在arm上）
./test
在异常退出时，会显示如下信息，注意括号里的内容
Segmentation fault (core dumped)
程序执行目录下将产生coredump文件
4. 用gdb分析：（在x86上）
gdb 的选择依赖于目标平台，qnx 提供了以下四种：
ARMv7:ntoarmv7-gdb
ARMv8：ntoaarch64-gdb
x86:ntox86-gdb
x86 64-bit:ntox86_64-gdb
在交叉编译环境下找到可以在x86运行的用于调试target环境的gdb程序。一般位于host/linux/x86_64/usr/bin目录下，armv8下程序为ntoaarch64-gdb。
运行:
```
ntoaarch64-gdb ./test  test.coredump
```
输入run开始调试，
再用gdb的bt或where看就可以调试信息了


<hr />
版权信息