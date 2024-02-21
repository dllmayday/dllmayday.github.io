---
title: Cmake基本语法
permalink: 
categories: 
- 技术分享
- Cmake
tags: Cmake
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-21 15:14:50
---
## 子目录添加
```
cmake_minimum_required(VERSION 3.0)
project(<工程名>)
#将子目录添加到生成中
add_subdirectory(source_dir [binary_dir] [EXCLUDE_FROM_ALL] [SYSTEM])

```

<!--more-->

## 工程构建

```
cmake_minimum_required(VERSION 3.0)
project(<工程名>)

#终端输出当前工程目录
message("Project PATH: ${PROJECT_SOURCE_DIR}")

#设置编译目标输出路径
SET(EXECUTABLE_OUTPUT_PATH <输出路径>)

#设置编译参数
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -std=c++14 -fPIC -Wall")
set(CMAKE_C_FLAGS   "${CMAKE_C_FLAGS}   -O3 -std=c++14 -fPIC -Wall")
add_compile_options(-std=c++14 -Wno-write-strings -Wno-unused-result -O3)
add_definitions(-DFOO -DBAR ...)

#库查找
find_package(<package> [version] [EXACT] [QUIET] [MODULE]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [NO_POLICY_SCOPE])

#引入头文件
include_directories(<头文件路径>)
target_include_directories(target <头文件路径>)
#指定链接库路径
link_directories(<链接库路径>）

#查找在某个路径下的所有源文件,并将输出结果列表储存在指定的变量中
aux_source_directory(<路径名>      <变量名>)
#增加变量
set(<变量名>   <值>)

#指定编译输出
add_library(<目标输出名> SHARED <所有源文件列表>)
add_library(<目标输出名> STATIC <所有源文件列表>)
add_executable(<目标输出名>   <所有源文件列表>)


#单个目标输出指定链接库
target_link_libraries(<工程名>  <所有链接的库列表>)
#当前cmake下所有目标输出指定链接库
link_libraries(<所有链接的库列表>)

```
## 查找所有源文件

```
#递归获取source/路径下所有的*.cpp和*.c文件列表
file(GLOB_RECURSE <变量名> CONFIGURE_DEPENDS "source/*.cpp" "source/*.c")	
#查找在某个路径下的所有源文件,并将输出结果列表储存在指定的变量中
file(GLOB <变量名>CONFIGURE_DEPENDS  "source/*.cpp" "source/*.c")
#查找在某个路径下的所有源文件,并将输出结果列表储存在指定的变量中
aux_source_directory(<路径名>      <变量名>)
```
## 定义函数，把文件夹下所有子文件夹保存在变量中

```

macro(list_sub_dir RESULT CUR_DIR FILTER_LIST)
    file(GLOB_RECURSE CHILDREN LIST_DIRECTORIES true  ${CUR_DIR}/*)
    set(DIR_LIST ${CUR_DIR})
    foreach(CHILD ${CHILDREN})
        if(IS_DIRECTORY ${CHILD})
            set(ADD_FLAG ON)
            foreach(FILTER ${FILTER_LIST})
                string(FIND "${FILTER}" "${CHILD}" RET)
                if(${RET} EQUAL -1)
                    set(ADD_FLAG OFF)
                endif()
            endforeach()
            if(${ADD_FLAG})
                list(APPEND DIR_LIST ${CHILD})
            endif()
            unset(ADD_FLAG)
        endif()
    endforeach()
    set(${RESULT} ${DIR_LIST})
endmacro()
```
## 自动添加子目录下的CMakeLists

```

file(GLOB SUB_DIRS RELATIVE ${CMAKE_CURRENT_SOURCE_DIR} ${CMAKE_CURRENT_SOURCE_DIR}/*)
foreach(DIR ${SUB_DIRS})
    if(EXISTS ${CMAKE_CURRENT_SOURCE_DIR}/${DIR}/CMakeLists.txt)
        add_subdirectory(${DIR})
    endif()
endforeach()
```
##  获取文件夹名称
```

get_filename_component(module_name ${CMAKE_CURRENT_SOURCE_DIR} NAME)
```
<hr />
版权信息