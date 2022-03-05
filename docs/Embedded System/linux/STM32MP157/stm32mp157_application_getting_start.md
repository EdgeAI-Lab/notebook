# STM32MP157 Application Hello World

* [Reference ST Wiki](https://wiki.stmicroelectronics.cn/stm32mpu/wiki/Getting_started/STM32MP1_boards/STM32MP157x-DK2/Develop_on_Arm%C2%AE_Cortex%C2%AE-A7/Create_a_simple_hello-world_application)

## 1. 下载STM32MP1 OpenSTLinux Developer Package

Developer Package主要是提供了交叉编译环境，可以编译应用程序，然后在STM32MP157-DK2开发板上运行。


使用Yocto_SDK，下载地址：

* [Developer Package下载地址](https://www.st.com/content/my_st_com/en/products/embedded-software/mcu-mpu-embedded-software/stm32-embedded-software/stm32-mpu-openstlinux-distribution/stm32mp1dev.license=1646465148472.product=STM32MP1Dev.version=3.1.0.html)

## 2.安装STM32MP1 OpenSTLinux Developer Package

* 解压
```
tar xvf en.SDK-x86_64-stm32mp1-openstlinux-5.10-dunfell-mp1-21-11-17.tar.xz
```
* 安装（-d 后面跟安装路径）
```
./stm32mp1-openstlinux-5.10-dunfell-mp1-21-11-17/sdk/st-image-weston-openstlinux-weston-stm32mp1-x86_64-toolchain-3.1.11-openstlinux-5.10-dunfell-mp1-21-11-17.sh -d <working directory absolute path>/Developer-Package/SDK
```

## 3. 配置交叉编译环境

```
source SDK/environment-setup-cortexa7t2hf-neon-vfpv4-ostl-linux-gnueabi
```

## 4.验证交叉编译环境是否配置成功

```
$ echo $ARCH
arm
```

```
$ echo $CROSS_COMPILE
arm-ostl-linux-gnueabi-
```

```
$ CC --version
arm-ostl-linux-gnueabi-gcc (GCC) 9.3.0  
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

## 5.编写测试程序

* gtk_hello_world.c

```c
#include <gtk/gtk.h>

static void
print_hello (GtkWidget *widget,
             gpointer   data)
{
  g_print ("Hello World\n");
}

static void
activate (GtkApplication *app,
          gpointer        user_data)
{
  GtkWidget *window;
  GtkWidget *button;
  GtkWidget *button_box;

  window = gtk_application_window_new (app);
  gtk_window_set_title (GTK_WINDOW (window), "Window");
  gtk_window_set_default_size (GTK_WINDOW (window), 200, 200);

  button_box = gtk_button_box_new (GTK_ORIENTATION_HORIZONTAL);
  gtk_container_add (GTK_CONTAINER (window), button_box);

  button = gtk_button_new_with_label ("Hello World");
  g_signal_connect (button, "clicked", G_CALLBACK (print_hello), NULL);
  g_signal_connect_swapped (button, "clicked", G_CALLBACK (gtk_widget_destroy), window);
  gtk_container_add (GTK_CONTAINER (button_box), button);

  gtk_widget_show_all (window);
}

int
main (int    argc,
      char **argv)
{
  GtkApplication *app;
  int status;

  app = gtk_application_new ("org.gtk.example", G_APPLICATION_FLAGS_NONE);
  g_signal_connect (app, "activate", G_CALLBACK (activate), NULL);
  status = g_application_run (G_APPLICATION (app), argc, argv);
  g_object_unref (app);

  return status;
}
```

* Makefile

```makefile
PROG = gtk_hello_world
SRCS = gtk_hello_world.c

CLEANFILES = $(PROG)

# Add / change option in CFLAGS and LDFLAGS
CFLAGS += -Wall $(shell pkg-config --cflags gtk+-3.0)
LDFLAGS += $(shell pkg-config --libs gtk+-3.0)

all: $(PROG)

$(PROG): $(SRCS)
	$(CC) -o $@ $^ $(CFLAGS) $(LDFLAGS)

clean:
	rm -f $(CLEANFILES) $(patsubst %.c,%.o, $(SRCS))
```

* 编译

```
$ make
```

* 将编译好的程序传送到STM32MP157-DK2开发板

```
$ scp gtk_hello_world root@<board ip address>:/usr/local
```

* 运行程序

SSH(ssh root@192.168.1.8)或者串口登录系统，然后：

```
$ cd /usr/local
$ ./gtk_hello_world
```