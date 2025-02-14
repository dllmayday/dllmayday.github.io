---
title: sd-bus-demo
permalink: 
categories:
- 技术分享
- dbus
tags: dbus
description: 
image: 
copyright: true
date: 2025-02-14 17:08:12
---

systemd/sd-bus 实现一个简单的服务端代码。
[sd-bus接口](https://www.freedesktop.org/software/systemd/man/latest/sd-bus.html)

<!--more-->
## 实现
1. 定义 D-Bus 接口
首先，定义一个 D-Bus 接口，包含以下方法：
EnterCustomMode(): 进入定制模式。
ExitCustomMode(): 退出定制模式。
Heartbeat(): 客户端定时调用的心跳函数。

```
#include <systemd/sd-bus.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>

#define DBUS_INTERFACE "com.example.CustomMode"
#define DBUS_OBJECT_PATH "/com/example/CustomMode"

static int custom_mode = 0;
static time_t last_heartbeat = 0;

static int method_enter_custom_mode(sd_bus_message *m, void *userdata, sd_bus_error *ret_error) {
    custom_mode = 1;
    last_heartbeat = time(NULL);
    return sd_bus_reply_method_return(m, "");
}

static int method_exit_custom_mode(sd_bus_message *m, void *userdata, sd_bus_error *ret_error) {
    custom_mode = 0;
    return sd_bus_reply_method_return(m, "");
}

static int method_heartbeat(sd_bus_message *m, void *userdata, sd_bus_error *ret_error) {
    last_heartbeat = time(NULL);
    return sd_bus_reply_method_return(m, "");
}

static const sd_bus_vtable custom_mode_vtable[] = {
    SD_BUS_VTABLE_START(0),
    SD_BUS_METHOD("EnterCustomMode", "", "", method_enter_custom_mode, SD_BUS_VTABLE_UNPRIVILEGED),
    SD_BUS_METHOD("ExitCustomMode", "", "", method_exit_custom_mode, SD_BUS_VTABLE_UNPRIVILEGED),
    SD_BUS_METHOD("Heartbeat", "", "", method_heartbeat, SD_BUS_VTABLE_UNPRIVILEGED),
    SD_BUS_VTABLE_END
};

int main(int argc, char *argv[]) {
    sd_bus *bus = NULL;
    sd_bus_slot *slot = NULL;
    int r;

    r = sd_bus_open_system(&bus);
    if (r < 0) {
        fprintf(stderr, "Failed to connect to system bus: %s\n", strerror(-r));
        goto finish;
    }

    r = sd_bus_add_object_vtable(bus, &slot, DBUS_OBJECT_PATH, DBUS_INTERFACE, custom_mode_vtable, NULL);
    if (r < 0) {
        fprintf(stderr, "Failed to add object vtable: %s\n", strerror(-r));
        goto finish;
    }

    r = sd_bus_request_name(bus, DBUS_INTERFACE, 0);
    if (r < 0) {
        fprintf(stderr, "Failed to acquire service name: %s\n", strerror(-r));
        goto finish;
    }

    while (1) {
        r = sd_bus_process(bus, NULL);
        if (r < 0) {
            fprintf(stderr, "Failed to process bus: %s\n", strerror(-r));
            goto finish;
        }
        if (r > 0)
            continue;

        r = sd_bus_wait(bus, (uint64_t) 1000000); // 1 second timeout
        if (r < 0) {
            fprintf(stderr, "Failed to wait on bus: %s\n", strerror(-r));
            goto finish;
        }

        // Check heartbeat timeout
        if (custom_mode && (time(NULL) - last_heartbeat) > 10) {
            custom_mode = 0;
            printf("Heartbeat timeout, exiting custom mode.\n");
        }
    }

finish:
    sd_bus_slot_unref(slot);
    sd_bus_unref(bus);
    return r < 0 ? EXIT_FAILURE : EXIT_SUCCESS;
}
```
## 编译
```
gcc -o sdbus-demo demo.c -lsystemd
```
<hr />
版权信息