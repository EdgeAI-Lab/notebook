# Develop STM32 using VSCode

可以通过STM32CubeMX生成Makefile项目，，也可以使用CMake从源码自己构建项目，编译之后，使用VSCode + VSCode插件cortex-debug + OpenOCD进行调试。

这个过程中最麻烦的就是环境配置，该环境配置在Linux系统中较为容易，在Windows系统中较为繁琐。

## 1. Windows系统环境配置

以STM32CubeMX生成的Makefile项目为例。

## 1.1 make

[make for windows download](https://github.com/xpack-dev-tools/windows-build-tools-xpack/releases/tag/v2.12-20190422)

下载后解压，然后将make.exe的路径设置到环境变量PATH中：

```
C:\Workspace\STM32\vscode_stm32\Build Tools\2.12-20190422-1053\bin
```

* 重启VSCode使环境变量生效（要将所有打开的VSCode实例都关闭才行）

* 打开VSCode中的命令终端，输入make命令，查看make环境是否设置成功

* make环境设置成功后，就可以直接编译STM32CubeMX生成的项目

## 1.2 debug

首先需要安装VSCode插件Cortex_Debug和OpenOCD。

[OpenOCD for Windows Download](https://github.com/ilg-archived/openocd/releases/tag/v0.10.0-12-20190422)

stlink-v2.cfg文件和stm32f1x.cfg文件由OpenOCD提供，在OpenOCD的scripts文件夹中。

还需要一个MCU的SVD(System View Description format)文件，[STM32 SVD Download](https://github.com/posborne/cmsis-svd)

然后在 launch.json 文件中写入配置：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Cortex debug",
            "type": "cortex-debug",
            "request": "launch",
            "servertype": "openocd",
            "cwd": "${workspaceFolder}",
            "executable": "build/test_debug.elf",
            "svdFile": ".vscode/STM32F103xx.svd",
            "configFiles": [
                "C:/Workspace/STM32/vscode_stm32/OpenOCD/0.10.0-12-20190422-2015/scripts/interface/stlink-v2.cfg",
                ".vscode/stm32f1x.cfg"
            ],
        },
    ]
}
```

配置完成之后，点击 F5 键进入调试模式。



