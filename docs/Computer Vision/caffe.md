# Installing Caffe from source

[Caffe官网安装说明](https://caffe.berkeleyvision.org/install_apt.html)

下面以小编自己的理解，在Ubuntu18.04中进行Caffe安装。

Caffe官网介绍

## 1.安装依赖

```
sudo apt-get install libprotobuf-dev libleveldb-dev libsnappy-dev libopencv-dev libhdf5-serial-dev protobuf-compiler

sudo apt-get install --no-install-recommends libboost-all-dev

sudo apt-get install libatlas-base-dev

sudo apt-get install libgflags-dev libgoogle-glog-dev liblmdb-dev
```

## 2.配置文件
将caffe源码根目录下的Makefile.config.example文件复制一份，并命名为
Makefile.config

```
cp Makefile.config.example Makefile.config
```

修改Makefile.config文件

* CPU版本
```
CPU_ONLY := 1
```

* OpenCV版本

查看系统中安装的OpenCV版本

```
pkg-config --modversion opencv
```
如果上面指令的打印结果是：3.x.x(Ubuntu18.04 默认是3.2.0)

请去掉OPENCV_VERSION的注释
```
# Uncomment if you're using OpenCV 3
OPENCV_VERSION := 3
```

* 将HDF5的头文件和库路径添加进来

```
INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include /usr/include/hdf5/serial

LIBRARY_DIRS := $(PYTHON_LIB) /usr/local/lib /usr/lib /usr/lib/x86_64-linux-gnu/hdf5/serial
```

* 如果你使用的是OpenBLAS

```bash
# 将BLAS的值修改为open，因为我们将使用openBLAS
BLAS := open

# 如果你使用的OpenBLAS没有安装在自定义目录，请添加头文件路径和库文件路径
# Whatever else you find you need goes here.
INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include /home/fhc/caffe/openblas_install/include
LIBRARY_DIRS := $(PYTHON_LIB) /usr/local/lib /usr/lib /home/fhc/caffe/openblas_install/lib

```


* Install OpenBLAS(Base Linear Algebra Subprograms)
modify the BLAS := open in the Makefile.config

```bash
git clone https://github.com/xianyi/OpenBLAS.git
make 
make install
```
modify the BLAS_INCLUDE & BLAS_LIB

```bash
BLAS_INCLUDE := /opt/OpenBLAS/include 
BLAS_LIB := /opt/OpenBLAS/lib
```

## 3.编译

```
cd $caffe_root
make all
```

如果需要在python中使用，首先安装numpy库

```
sudo pip install numpy
```
然后在make all结束后，执行如下指令：

```
make pycaffe
```

最后将pycaffe的路径添加到PYTHONPATH
```
# 这种方式是临时添加，再次启动终端需要重新添加
export PYTHONPATH=/path/to/caffe/python:$PYTHONPATH
```

## 4. 可能会遇到的错误

```
# 错误信息
undefined reference to `cv::imread(cv::String const&, int)'

# 解决方法
修改Makefile.config,将OPENCV_VERSION := 3
```

```
# 错误信心
ImportError: No module named _caffe

# 解决方法
make pycaffe

# 并将pycaffe路径添加到PYTHONPATH
export PYTHONPATH=/path/to/caffe/python:$PYTHONPATH

```

```
# 错误信息
ImportError: No module named skimage.io

# 解决方法
pip install scikit-image
```

```
# 错误信息
python/caffe/_caffe.cpp:10:10: fatal error: numpy/arrayobject.h: No such file or directory
 #include <numpy/arrayobject.h>
          ^~~~~~~~~~~~~~~~~~~~~
compilation terminated.

# 解决方法

使用help('numpy')可以查看到numpy的实际安装位置，然后在Makefile.config中配置numpy的真实路径

PYTHON_INCLUDE := ... /home/your_name/.local/lib/python2.7/site-packages/numpy/core/include


# 引起错误的原因
caffe编译系统没有找到你安装的numpy，通常是因为你安装numpy的方法是：
pip install numpy
pip前不加sudo的话，python库会被安装到/home/your_name/.local/lib/python2.7/site-packages/中
```

```
ImportError: No module named google.protobuf.internal

pip install protobuf
```


