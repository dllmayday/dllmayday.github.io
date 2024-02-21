---
title: gcc编译时嵌入资源文件
permalink: 
categories: 
- 技术分享
- 实用技巧
tags: CMRC
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 16:32:12
---
需求:
程序在加载运行时有时候需要加载某一目录下的某些文件，而这些文件比较敏感，一旦被用户意外修改有可能导致程序运行出错甚至无法运行。为了避免这种情况的出现同时方便应用程序的移植，我们可以在编译应用程序的时候把这些资源文件一起编译进去，这样程序运行的时候就不会依赖目录下的文件了。

#1. CMKAE 编译嵌入使用github CMRC  参考github pbr_model_viewer工程
#2. bin2c bin2h 将资源文件转为字节数组 
#3. GCC 编译嵌入

<!--more-->



准备工作:
编写一个helloworld程序:
```
#include <stdio.h>
int main(void)
{
	printf("hello world\n");
	return 0;
}
```
编译:gcc helloworld.c -o helloworld.o
查看helloworld.o的文件格式与计算机体系架构:
objdump -x helloworld.o
在这里插入图片描述
从上图可以看出文件格式与计算机体系架构分别为:
文件格式：elf64-tradlittlemips
体系结构：mips:isa64r2

两个文件:
1、test.txt:
```
This file is named ning.txt
```
2、main.c
```
#include <stdio.h>
#include <stdlib.h>
extern char _binary_ning_txt_start;
extern char _binary_ning_txt_end;
int main(void)
{
	printf("hello world\n");
	char *p = &_binary_ning_txt_start;
	while(p != &_binary_ning_txt_end)
		putchar(*p++);
	return 0;
}
```
从上面的main.c可以看到，引入了两个外部变量
extern char _binary_ning_txt_start;
extern char _binary_ning_txt_end;

这两个变量是将文件test.txt编译成二进制文件的时候生成的，具体的编译指令如下:
```
objcopy --input binary --output elf64-tradlittlemips --binary-architecture mips:isa64r2 ning.txt ning.o
```
说明:
–input binary ： 输入文件以二进制
–output elf64-tradlittlemips：输出elf64-tradlittlemips格式文件
–binary-architecture mips:isa64r2：该输出文件跑在mips:isa64r2体系架构上，这个擦拿书可参考资料https://sourceware.org/binutils/docs/binutils/objcopy.html的描述:

--binary-architecture=bfdarch
Useful when transforming a architecture-less input file into an object file. 
In this case the output architecture can be set to bfdarch. This option will 
be ignored if the input file has a known bfdarch. You can access this binary
 data inside a program by referencing the special symbols that are created 
 by the conversion process. These symbols are called _binary_objfile_start,
 _binary_objfile_end and _binary_objfile_size. e.g. you can transform a 
 picture file into an object file and then access it in your code using 
 these symbols.

后面两个参数的选择是根据前面的准备工作中得到的文件格式与计算机体系架构确定的，然后使用objdump工具查看文件ning.o:

这个就是main.c中引用的外部变量的由来，现在把两个文件编译在一起:
```
gcc main.c test.o -o xxxning
```
运行:
```
./xxxning
````

参考文献:
1、https://stackoverflow.com/questions/4864866/c-c-with-gcc-statically-add-resource-files-to-executable-library
2、https://sourceware.org/binutils/docs/binutils/objcopy.html
————————————————
原文链接：https://blog.csdn.net/u014780310/article/details/113770587

<hr />
版权信息