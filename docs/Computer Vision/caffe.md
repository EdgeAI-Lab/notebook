# Caffe Install

## 1.配置文件
将caffe源码根目录下的Makefile.config.example文件复制一份，并命名为
Makefile.config

然后按照如下所示，修改Makefile.config。

```bash


# 将BLAS的值修改为open，因为我们将使用openBLAS
BLAS := open

# 将/home/your_name/local_install目录追加到
# Whatever else you find you need goes here.
INCLUDE_DIRS := $(PYTHON_INCLUDE) /usr/local/include /home/fhc/caffe/local_install/include
LIBRARY_DIRS := $(PYTHON_LIB) /usr/local/lib /usr/lib /home/fhc/caffe/local_install/lib

```



```bash

sudo apt-get install libprotobuf-dev protobuf-compiler

sudo apt-get install libboost-all-dev

sudo apt-get install libgoogle-glog-dev

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



