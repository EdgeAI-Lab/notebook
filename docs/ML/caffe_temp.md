# Caffe相关临时目录

## Caffe模型可视化

### 1. 编译pycaffe

```
make pycaffe
```

### 2.安装依赖

```
pip install pydot
sudo apt-get install graphviz
```
### 3.可视化模型

```
cd $(CAFFE_ROOT)/python/
$ ./draw_net.py ../models/bvlc_googlenet/deploy.prototxt bvlc_googlenet.caffemodel.jpg
```

