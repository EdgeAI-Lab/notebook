# WSL与Windows共享文件夹

* WSL本身就是支持访问Windows的文件系统的

* 默认情况下WSL将Windows文件系统挂载到/mnt目录下


如果需要访问的Windows下的文件夹的路径比较长，为了方便WSL与Windows互访文件，可以这么做：

```
$ ln -s /mnt/c/xxx ~/win10 
```