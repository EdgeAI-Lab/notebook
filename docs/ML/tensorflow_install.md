# TensorFlow 安装

## 1. 安装

* 安装指令

```
# Requires the latest pip
pip install --upgrade pip

# Current stable release for CPU-only
pip install tensorflow

# Or preview build for CPU/GPU (unstable)
pip install tf-nightly
```

* 安装后查看版本

```python
import tensorflow as tf
print(tf.__version__)
```

## 2. 可能会遇到的问题

* pip升级后使用报错

```
# Error: from pip import main ImportError: cannot import name main

# solved
hash -d pip

```

* pip安装无权限

```
# ERROR: Could not install packages due to an EnvironmentError: [Errno 13] Permission denied: '/usr/local/lib/python3.6/dist-packages/rsa'

# solved
pip install --user tensorflow

# or
sudo pip install tensorflow

```

* sudo pip报错

```
# Error: from pip import main ImportError: cannot import name main

# solved:

1. 查看pip所在位置 whereis pip

2. 请分别测试找到的pip文件 pip -V

3. sudo pip一般使用的是/usr/bin等系统目录下的pip

4. 将测试正确的pip复制到系统目录，比如/usr/bin
```




* 安装后查看Tensorflow不是最新版本

```
pip install --upgrade tensorflow
```