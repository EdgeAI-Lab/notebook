# Develop STM32 using VSCode

可以通过STM32CubeMX生成Makefile项目，，也可以使用CMake从源码自己构建项目，编译之后，使用VSCode + VSCode插件cortex-debug + OpenOCD进行调试。

这个过程中最麻烦的就是环境配置，该环境配置在Linux系统中较为容易，在Windows系统中较为繁琐。

## 1.Windows系统环境配置

本文以STM32CubeMX生成的Makefile项目为例。所以首先你需要使用STM32CubeMX生成一个Makefile项目。编译这个Makefile项目，需要两个工具：

* [ARM交叉编译工具链](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads)

* [make](https://github.com/xpack-dev-tools/windows-build-tools-xpack/releases/tag/v2.12-20190422)

下载完成后解压，并将其配置到Windows环境变量PATH中，以便于全局访问。

```
# cross compiler toolchain
C:\Workspace\STM32\vscode_stm32\gcc-arm-none-eabi-10-2020-q4-major\bin

# make
C:\Workspace\STM32\vscode_stm32\Build Tools\2.12-20190422-1053\bin
```

**注意**：如果你之前打开了VSCode，那么请重启VSCode使环境变量生效（要将所有打开的VSCode实例都关闭才行），然后打开VSCode中的命令终端，输入make命令，如果项目能够被正确编译，说明环境配置是正确的。

编译完成之后会生成elf可执行文件，改文件包含debug信息，可用于仿真调试。

## 2.Debug

仿真调试需要两个工具：

* VSCode插件Cortex_Debug
* [OpenOCD](https://github.com/ilg-archived/openocd/releases/tag/v0.10.0-12-20190422)

还需要三个配置文件：

* stlink-v2.cfg
* stm32f1x.cfg
* STM32Fxxxxx.svd

stlink-v2.cfg文件和stm32f1x.cfg文件由OpenOCD提供，在OpenOCD的scripts文件夹中。如果你使用JLink，scripts文件夹中也有相应的文件。

SVD(System View Description format)文件可以从这里下载 [STM32 SVD Download](https://github.com/posborne/cmsis-svd)。

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



