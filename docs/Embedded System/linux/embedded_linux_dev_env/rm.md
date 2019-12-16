# 安全的使用rm

## 1. 创建一个脚本

创建脚本`my_rm.sh`,该脚本的功能是：将文件移动到回收站。

```bash
# script to send removed files to trash directory
mv $@ ~/.local/share/Trash/files          #有$1~$9个数量, $@代表all
```

## 2. 给rm命令起一个别名

打开 `.bashrc` 文件

```
# 进入home目录
cd

# 打开 .bashrc 文件
vim .bashrc
```

在 `.bashrc` 文件末尾添加如下内容：

```
alias rm=/home/your_name/my_rm.sh
```

使修改生效，使用如下命令或者重启终端：

```
source ~/.bashrc
```

现在使用 `rm` 指令删除的文件，都会先进入回收站，不会直接永久删除。