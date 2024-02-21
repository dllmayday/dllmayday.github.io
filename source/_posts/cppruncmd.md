---
title: C++代码内部执行命令方法
permalink: 
categories: 实用技巧
tags: cmd
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-21 10:10:17
---

在C++代码中执行命令有几种方法，每种方法都有其自身的优缺点。以下是一些常见的方法：

<!--more-->

## std::system函数：

```
#include <cstdlib>

int main() {
    std::system("command_to_execute");
    return 0;
}
```

优点：简单易用，适用于执行简单的命令。
缺点：不够灵活，不能捕获命令执行的输出，容易受到系统命令注入等安全问题。

## std::popen函数：
```
#include <cstdio>

int main() {
    FILE* pipe = std::popen("command_to_execute", "r");
    if (!pipe) return 1;
    char buffer[128];
    while (fgets(buffer, sizeof(buffer), pipe) != nullptr) {
        // 处理命令输出
    }
    std::pclose(pipe);
    return 0;
}
```

优点：能够捕获命令执行的输出。
缺点：依然不够灵活，无法实时捕获命令输出。
使用操作系统特定的API：

每个操作系统都提供了执行外部命令的API，比如Windows下的CreateProcess/WinExec/ShellExecute或调用vbs脚本，Linux/Unix下的fork和exec等。
这种方法更灵活，但是需要了解操作系统特定的API，代码可移植性差。

## 第三方库：
有一些第三方库，比如Boost.Process，可以在C++中执行外部命令，并提供了更高级的功能，比如异步执行、捕获输出等。
C++17中的std::filesystem::path::lexically_normal:

使用C++17中的 std::filesystem::path::lexically_normal 和 std::filesystem::directory_iterator 可以遍历目录和文件。
```
#include <filesystem>
namespace fs = std::filesystem;
#include <iostream>

int main() {
    for (const auto& entry : fs::directory_iterator("/path/to/directory")) {
        std::cout << entry.path().lexically_normal() << std::endl;
    }
    return 0;
}
```

<hr />
版权信息