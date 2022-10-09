# CC2642 OAD

## 1. 基本信息
* BLE 5.2
* Powerful 48-MHz Arm® Cortex®-M4 processor
* 352KB flash program memory
* 256KB of ROM for protocols and library functions
* 8KB of cache SRAM
* 80KB of ultra-low leakage SRAM with parity for high-reliability operation
* 2-pin cJTAG and JTAG debugging（不支持SWD接口），比较新的JLINK应该是支持cJTAG接口的


[参考链接](https://software-dl.ti.com/simplelink/esd/simplelink_cc13x2_26x2_sdk/5.10.00.48/exports/docs/ble5stack/ble_user_guide/html/ble-stack-oad/setting-up-environment.html)

## 2. OAD(Over tO Air Download)

![](img/cc26x2_oad_onchip_flash_layout.png)

## 2.1 BIM(Boot Image Manager)

这部分大小是固定的。

## 2.2 OAD_IMG_A
* OAD_IMG_A 是Persistent application的起始地址，该地址的实际值需要根据具体的应用来决定，通过连接脚本中Flash的划分来决定；
* HDR_START是连接脚本中的变量名
* 我们可以参看下Demo工程中的连接脚本：simplelink_cc13xx_cc26xx_sdk_6_20_00_29\examples\rtos\CC26X2R1_LAUNCHXL\ble5stack\persistent_app\\tirtos7\ticlang\cc13x2_cc26x2_app_tirtos7.cmd

```
...

#define FLASH_BASE   0x00000000
#define GPRAM_BASE   0x11000000
#define RAM_BASE     0x20000000
#define ROM_BASE     0x10000000

#define FLASH_SIZE   0x00058000
#define GPRAM_SIZE   0x00002000
#define RAM_SIZE     0x00014000
#define ROM_SIZE     0x00040000


#define NUM_RESERVED_FLASH_PAGES   1
#define RESERVED_FLASH_SIZE        (NUM_RESERVED_FLASH_PAGES * PAGE_SIZE)


#define IMG_A_FLASH_START          0x00038000  // 224K

/* Image specific addresses */
#ifdef OAD_IMG_A
  #define  OAD_HDR_START           IMG_A_FLASH_START  // 224K ↑
  #define  OAD_HDR_END             (OAD_HDR_START + OAD_HDR_SIZE - 1)
  #define  ENTRY_SIZE              0x40
  #define  ENTRY_START             (OAD_HDR_END + 1)
  #define  ENTRY_END               ENTRY_START + ENTRY_SIZE - 1
  #define  FLASH_START             (ENTRY_END + 1)
  #define  FLASH_END               (FLASH_BASE + FLASH_SIZE - RESERVED_FLASH_SIZE - 1)
#else
  #define OAD_HDR_START            FLASH_BASE
  #define OAD_HDR_END              (OAD_HDR_START + OAD_HDR_SIZE - 1)

  #define ENTRY_START              (OAD_HDR_END + 1)
  #define ENTRY_SIZE               0x40
  #define ENTRY_END                ENTRY_START + ENTRY_SIZE - 1
  #define FLASH_START              (ENTRY_END + 1)
  #define FLASH_END                (FLASH_BASE + IMG_A_FLASH_START - 1)
#endif

...

```

## 2.3 OAD_IMG_B


* OAD_IMG_B是应用程序（我们自己写的）的结束地址，这个地址也是可变的，程序大就往上，程序小就往下
* Avaliable User Application Space应该就是指OAD_IMG_B是可变的，所以这部分可能用得上，也可能是空置的，最大就是到OAD_IMG_A，
* FLASH_END是连接脚本中的变量名称
* 