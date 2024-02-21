---
title: GLOG参数说明
permalink: 
categories: 
- 技术分享
- GLOG
tags: glog
description: 
image: 
copyright: true     //增加底部的版权信息（需要配置）
date: 2024-02-20 17:10:43
---

GLOG参数设置：

--logtostderr：将日志输出到标准错误流而不是日志文件。
--stderrthreshold=<severity>：设置将输出到标准错误流的日志消息的最低严重程度。
--log_dir=<directory>：设置日志文件输出目录。
--minloglevel=<severity>：设置记录到日志文件的最低严重程度。
--v=<n>：设置日志的详细级别。<n>可以是一个整数，控制日志的详细程度，较高的值会产生更多的详细信息。
--vmodule=<module_spec>：设置特定模块的详细级别。可以指定模块名称和详细级别，以逗号分隔。
--alsologtostderr：将日志同时输出到日志文件和标准错误流。
--colorlogtostderr：在终端输出彩色日志。


<!--more-->
```
#include <glog/logging.h>

int main(int argc, char* argv[]) {
    // 初始化 Google 日志库
    google::InitGoogleLogging(argv[0]);

    // 设置日志输出目录
    FLAGS_log_dir = "/path/to/log/directory";

    // 设置日志的最低记录级别
    FLAGS_minloglevel = google::INFO; // 可以设置为 google::INFO、google::WARNING、google::ERROR 等级别

    // 设置日志详细级别
    FLAGS_v = 2; // 设置为2，表示输出详细级别为2的日志信息

    // 执行你的程序逻辑
    LOG(INFO) << "这是一个信息级别的日志消息";
    LOG(WARNING) << "这是一个警告级别的日志消息";
    LOG(ERROR) << "这是一个错误级别的日志消息";

    // 关闭 Google 日志库
    google::ShutdownGoogleLogging();

    return 0;
}

```


<hr />
版权信息