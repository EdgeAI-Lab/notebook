# ROS入门教程

[有条件请ROS参考官方教程](https://docs.ros.org/en/foxy/Tutorials.html)，下面的是笔者自己的学习记录。

!!! Note 本文使用的ROS版本是foxy，Ubuntu版本是20.04，foxy是ROS的LTS版本性能稳定，太新的版本可能会出现意想不到的问题。

## 1. 安装ROS

请参考：

* [Moveit Getting Start - web](../moveit/moveit_getting_start.md) 
* [Moveit Getting Start - B站](https://www.bilibili.com/video/BV1fT4y1z7fG/)

## 2. Configuring your ROS 2 environment

* Source the setup files

```
source /opt/ros/foxy/setup.bash
```

## 3. Introducing turtlesim and rqt

对于ROS来说turtlesim是一个非常简单的仿真，但是使用它足以向初学者说明ROS底层的运行机制（nodes, topic, services），所以turtlesim通常是ROS入门的第一课。

rqt是ROS2的一个GUI工具，rqt提供能做的事情在命令行中都能做，但是rqt提供的更友好的图形化操作方式。

### 3.1 安装turtlesim

```
sudo apt update

sudo apt install ros-foxy-turtlesim
```

* Check that the package installed:

```
ros2 pkg executables turtlesim
```

### 3.2 启动turtlesim

```
ros2 run turtlesim turtlesim_node
```

![](img/turtlesim.png)

同时在命令行中会打印出如下信息：

```
# turtlesim_node是ROS的一个node（节点）
[INFO] [turtlesim]: Starting turtlesim with node name /turtlesim

[INFO] [turtlesim]: Spawning turtle [turtle1] at x=[5.544445], y=[5.544445], theta=[0.000000]
```

在turtlesim_node中可以生成多只乌龟，启动turtlesim的同时将会自动生成一只乌龟，从上面命令行信息可以看出默认生成的乌龟的名字是turtle1。

### 3.3 使用turtlesim

* turtlesim_node其实是ROS的一个节点，该节点可以控制乌龟移动

* 在这里我们启动另一节点turtle_teleop_key，该节点能够接受键盘(Arrow Keys)信息，并将该信息发送给turtlesim节点

```
ros2 run turtlesim turtle_teleop_key
```

* turtlesim_node节点接收到按键信息后就会执行相应的动作

### 3.4 安装rqt

```
sudo apt update

sudo apt install ~nros-foxy-rqt*
```



