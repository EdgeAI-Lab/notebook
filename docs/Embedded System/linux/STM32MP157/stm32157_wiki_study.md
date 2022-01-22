# STM32MP157F-DK2 

[STM32 MPU wiki](https://wiki.stmicroelectronics.cn/stm32mpu/wiki/Main_Page)

## 1. STM32MP1 OpenSTLinux Starter Package

Starter Package就是直接提供刷机镜像文件，通过USB配合STM32CubeProg烧写到板子。

* [Starter Package下载地址](https://www.st.com/content/my_st_com/en/products/embedded-software/mcu-mpu-embedded-software/stm32-embedded-software/stm32-mpu-openstlinux-distribution/stm32mp1starter.license=1640785070785.product=STM32MP15Starter.version=3.1.0.html)

### 1.1 烧写方法

* [详细步骤可以参考这里](https://wiki.stmicroelectronics.cn/stm32mpu/wiki/Getting_started/STM32MP1_boards/STM32MP157x-DK2/Let%27s_start/Populate_the_target_and_boot_the_image)

下面简单介绍下：

* 设置开发板为下载模式
![](./img/STM32MP157C-DK2_jumper_flash.jpg)
* 在STM32CubeProg中设置要下载的文件

0. Connect USB

1. Select the "Open File" tab and choose the "FlashLayout_sdcard_stm32mp157x-dk2-trusted.tsv" file in the Starter Package installation folder ("$HOME/STM32MPU_workspace/STM32MP15-Ecosystem-v3.1.0/Starter-Package/stm32mp1-openstlinux-5.10-dunfell-mp1-21-11-17/images/stm32mp1/flashlayout_st-image-weston/trusted")


2. Fill the "Binaries Path" by browsing to the $[Starter_Pack_Path]/images/stm32mp1 folder.

3. Click Download




