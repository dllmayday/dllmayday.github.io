---
title: cmake常见编译选项
permalink: 
categories: 
- 技术分享
- Cmake
tags: Cmake
description: /
image: 
copyright: true   
date: 2025-02-14 16:46:10
---

CMake 提供了一些内置的编译选项和变量，用于控制编译过程、优化构建配置、设置安装路径等。以下是一些常见的 CMake 内置编译选项：

### 1. **`CMAKE_BUILD_TYPE`**

<!--more-->

   设置构建类型，这决定了生成的编译选项和优化级别。常见的值有：
   - `Debug`：调试模式，生成符号文件以便调试。
   - `Release`：发布模式，进行优化，去除调试信息。
   - `RelWithDebInfo`：带调试信息的发布模式，包含优化和调试信息。
   - `MinSizeRel`：优化生成最小的可执行文件。

   ```bash
   cmake -DCMAKE_BUILD_TYPE=Release ..
   ```

### 2. **`CMAKE_CXX_FLAGS` / `CMAKE_C_FLAGS`**
   分别为 C++ 和 C 编译器设置额外的编译标志。例如，启用 `-Wall` 警告或其他编译器特性：
   
   ```bash
   cmake -DCMAKE_CXX_FLAGS="-Wall -O2" ..
   ```

### 3. **`CMAKE_CXX_COMPILER` / `CMAKE_C_COMPILER`**
   指定用于 C++ 和 C 编译的编译器路径。如果不指定，CMake 会使用系统默认的编译器。

   ```bash
   cmake -DCMAKE_CXX_COMPILER=/path/to/g++ ..
   ```

### 4. **`CMAKE_INSTALL_PREFIX`**
   设置 `make install` 时的安装路径。默认情况下，安装路径是 `/usr/local`（或 Windows 上的 `C:/Program Files/`）。通过 `-DCMAKE_INSTALL_PREFIX` 可以自定义安装目录。

   ```bash
   cmake -DCMAKE_INSTALL_PREFIX=/path/to/install ..
   ```

### 5. **`CMAKE_VERBOSE_MAKEFILE`**
   启用或禁用生成的 Makefile 的详细输出。设置为 `TRUE` 会输出详细的编译和链接命令。

   ```bash
   cmake -DCMAKE_VERBOSE_MAKEFILE=TRUE ..
   ```

### 6. **`CMAKE_EXPORT_COMPILE_COMMANDS`**
   设置为 `TRUE` 时，CMake 会生成 `compile_commands.json` 文件，包含项目的编译命令，通常用于集成开发环境（IDE）或工具，如 `clang-tidy`、`clangd` 等。

   ```bash
   cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=YES ..
   ```

### 7. **`CMAKE_TOOLCHAIN_FILE`**
   使用指定的工具链文件来设置交叉编译的环境或使用不同的编译器。

   ```bash
   cmake -DCMAKE_TOOLCHAIN_FILE=/path/to/toolchain.cmake ..
   ```

### 8. **`CMAKE_PREFIX_PATH`**
   指定 CMake 查找外部包的路径。例如，告诉 CMake 在特定路径中查找第三方库或依赖。

   ```bash
   cmake -DCMAKE_PREFIX_PATH=/path/to/libraries ..
   ```

### 9. **`CMAKE_INSTALL_RPATH`**
   设置动态库查找路径（`rpath`）的安装路径。常用于指定安装后可执行文件查找动态库的路径。

   ```bash
   cmake -DCMAKE_INSTALL_RPATH=/path/to/libs ..
   ```

### 10. **`CMAKE_OSX_ARCHITECTURES`**
   在 macOS 上指定构建架构（如 `x86_64` 或 `arm64`）。用于构建多个架构的二进制文件。

   ```bash
   cmake -DCMAKE_OSX_ARCHITECTURES="x86_64;arm64" ..
   ```

### 11. **`CMAKE_BUILD_PARALLEL_LEVEL`**
   控制并行构建的数量。默认情况下，CMake 会根据系统的核心数自动选择并行构建的级别，可以通过该选项覆盖。

   ```bash
   cmake -DCMAKE_BUILD_PARALLEL_LEVEL=4 ..
   ```

### 12. **`CMAKE_DISABLE_FIND_PACKAGE_<PACKAGE_NAME>`**
   禁用查找特定包的功能。例如，如果你不想让 CMake 查找 `OpenGL` 包，可以使用：

   ```bash
   cmake -DCMAKE_DISABLE_FIND_PACKAGE_OpenGL=TRUE ..
   ```

### 13. **`CMAKE_EXPORT_NO_PACKAGE_REGISTRY`**
   禁用将包信息写入包注册表。如果你不希望 CMake 在生成过程中修改包注册表，可以设置此选项：

   ```bash
   cmake -DCMAKE_EXPORT_NO_PACKAGE_REGISTRY=TRUE ..
   ```

### 14. **`CMAKE_SKIP_INSTALL_RPATH`**
   跳过设置安装后的 `rpath`，通常用于控制库的路径查找行为。

   ```bash
   cmake -DCMAKE_SKIP_INSTALL_RPATH=TRUE ..
   ```

### 15. **`CMAKE_PREFIX_PATH`**
   用于添加 CMake 搜索库、包的路径。例如，如果依赖的库不在系统标准路径下，可以指定一个路径：

   ```bash
   cmake -DCMAKE_PREFIX_PATH=/path/to/special/libs ..
   ```

### 16. **`CMAKE_FIND_FRAMEWORK`**
   在 macOS 上使用这个选项可以控制是否查找 Frameworks：

   ```bash
   cmake -DCMAKE_FIND_FRAMEWORK=LAST ..
   ```

这些是 CMake 中最常见的内置编译选项，你可以根据项目的具体需求来传递不同的参数和选项。你是否正在配置某个特定的项目？如果有任何问题或需要更多细节，随时告诉我！

<hr />
版权信息