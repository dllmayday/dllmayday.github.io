---
title: GDB调试
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

##1.Debugged program settings
```
set args [Arguments]
show args
```

##2.break command
Creates a breakpoint at a specified line, address or function.

<!--more-->



###Syntax
```
break
b
break [Function Name]
break [File Name]:[Line Number]
break [Line Number]
break *[Address]
break [...] if [Condition]
break [...] thread [Thread-id]
b [...]
```
###Examples
Using function name:
```
(gdb) b main
Breakpoint 1 at 0x401395: file 0.cpp, line 4.
(gdb)
```
Using function address:
```
(gdb) info address main
Symbol "main(int, char**)" is a function at address 0x40138c.
(gdb) break *0x40138c
Breakpoint 2 at 0x40138c: file 0.cpp, line 4.
(gdb)
```
Using file name and line number:
```
(gdb) info line main
Line 4 of "0.cpp" starts at address 0x40138c <main(int, char**)>
and ends at 0x401395 <main(int, char**)+9>.
(gdb) break 0.cpp:4
Breakpoint 3 at 0x401395: file 0.cpp, line 4.
```
Using line number only:
```
(gdb) info source
Current source file is 0.cpp
Compilation directory is C:\MinGW\bin
Located in c:\mingw\bin\0.cpp
Source language is c++.
Compiled with DWARF 2 debugging format.
Does not include preprocessor macro info.
(gdb) break 4
Breakpoint 4 at 0x40138c: file 0.cpp, line 4.
```
#3. Shared library commands
##info sharedlibrary command
```
info sharedlibrary
info share
```
##set solib-search-path command
```
set solib-search-path [Directories]
show solib-search-path
```
##set sysroot command
```
set sysroot [Directory]
set sysroot remote:/
set sysroot remote:[Remote directory]
set solib-absolute-prefix [Directory]
show sysroot
```

<hr />
版权信息