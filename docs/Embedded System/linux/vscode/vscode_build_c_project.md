# VSCode编译调试多文件C项目

VSCode并不支持C工程构建，所以想要使用VSCode构建c项目，就需要自己配置。

最佳解决方案（至少目前看来最佳）：
[VSCode结合CMake插件构建C项目](vscode_cmake_base.md)

也有2个小技巧，说明如下：

## 1. 修改tasks.json

在 args 字段中添加你的源文件。

```json
{
    "tasks": [
        {
            "type": "shell",
            "label": "C/C++: gcc build active file",
            "command": "/usr/bin/gcc",
            "args": [
                "-g",
                # 在这里添加上工程的所有源文件
                "/home/fhc/workspace/c_workspace/algorithm/cyclic_queue_test/test.c",
                "/home/fhc/workspace/c_workspace/algorithm/cyclic_queue_test/cyclic_queue.c",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ],
    "version": "2.0.0"
}
```

然后在主文件（有main函数的.c文件）中，点击鼠标右键，选择 Build and Debug Active File，根据提示进行操作即可。

## 2. 使用GCC编译，使用VSCode的图像界面进行调试

* 首先编译项目
```
gcc -g test.c cyclic_queue.c
```

* 修改 launch.json 文件

将 program 字段的值替换为你上面编译出来的ELF二进制文件

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "gcc - Build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "/home/fhc/workspace/c_workspace/algorithm/cyclic_queue_test/a.out",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "C/C++: gcc build active file",
            "miDebuggerPath": "/usr/bin/gdb"
        }
    ]
}
```