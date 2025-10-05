## 配置环境说明
* ROS    : humble
* Ubuntu : 22.04


## 0. 创建一个workspace

* 配置环境变量
```bash
source /opt/ros/humble/setup.sh
```
* 创建工作空间目录
```bash
mkdir -p ~/my_panda_ws/src/panda_robot

cd ~/my_panda_ws/src/panda_robot
# 创建panda_configure文件夹，用于存储 Moveit setup assistant生成的文件
mkdir panda_configure
# 直接复制 moveit2_tutorials 中的panda机械臂的URDF文件使用（请修改为你自己的moveit2_tutorials安装路径）
cp -r ~/ws_moveit/src/moveit_resources/panda_description ./
```

* 编译一下

```bash
# 在路径 my_panda_ws/src 下执行编译
cd ~/my_panda_ws/src
colcon bulid

# 设置环境变量，以便于moveit setup assitant可以正常加载 panda URDF文件
source install/setup.bash
```

## 1. 启动Moveit Setup Assistant

* 启动Moveit Setup Assistant，可参考教程[MoveIt Setup Assistant](https://moveit.picknik.ai/main/doc/examples/setup_assistant/setup_assistant_tutorial.html)

```bash
ros2 launch moveit_setup_assistant setup_assistant.launch.py
```
## 2. 选择URDF/xarco文件

```
my_panda_ws/src/panda_robot/panda_description/urdf/panda.urdf
```

![](./img/moveit_select_urdf_file.png)

## 3. Self-collision checking
![](./img/moveit_self-collision_check.png)

## 4. define virtual joint

* 相当于是定义机械臂的固定底座
![](./img/moveit_define_virtual_joint.png)

* 定义完成之后如下所示
![](./img/moveit_define_virtual_joint_finish.png)

## 5. define planning groups

* 定义机械臂的planning

![](./img/moveit_define_planning_groups_01.png)

![](./img/moveit_define_planning_groups_02.png)

![](./img/moveit_define_planning_groups_03.png)

![](./img/moveit_define_planning_groups_04.png)


* 定义机械夹爪的planning

![](./img/moveit_define_planning_groups_05.png)

![](./img/moveit_define_planning_groups_06.png)

* 定义完成后的结果如下

![](./img/moveit_define_planning_groups_07.png)

## 6. define robot poses

* 先定义机械臂的姿态

![](./img/moveit_arm_pose_01.png)
![](./img/moveit_arm_pose_02.png)

* 定义机械夹爪的姿态

![](./img/moveit_hand_pose_01.png)

* 如果这里报冲突错误是没有关系的，因为这里是仅指右侧这个姿态下有冲突，机械臂换个姿态就没有冲突了，也可以在上一步定义完机械臂的姿态后点击界面左下角的 Moveit 使机械臂的姿态调整到定义的位置，然后此处再进行夹爪的姿态配置就不会有冲突了

![](./img/moveit_hand_pose_02.png)
![](./img/moveit_hand_pose_03.png)
![](./img/moveit_hand_pose_04.png)

## 7. define end effectors

![](./img/moveit_define_end_effectors_01.png)
![](./img/moveit_define_end_effectors_02.png)

## 8. ros2_control URDF Modification

![](./img/moveit_ros2_control_urdf_modification.png)

## 9. ros2 controllers

![](./img/moveit_ros_controller_01.png)

* 将hand的控制器类型修改为position_controller
  
![](./img/moveit_ros_controller_03.png)
![](./img/moveit_ros_controller_04.png)

* 最终配置成功的结果如下

![](./img/moveit_ros_controller_05.png)

## 10. moveit controllers

![](./img/moveit_moveit_controller_01.png)

* 将hand的控制器类型修改为gripper command

![](./img/moveit_moveit_controller_03.png)
![](./img/moveit_moveit_controller_04.png)

* 最终配置成功的结果如下
![](./img/moveit_moveit_controller_05.png)

## 11. specify author information

![](./img/moveit_author_info.png)

## 12. generate configuration files

![](./img/moveit_generate_configure.png)

## 13. 编译工程

```bash
cd ~/my_panda_ws/src

colcon build

source install/setup.bash
```

## 14. 运行工程并在RViZ中展示效果

```bash
ros2 launch panda_configure demo.launch.py 
```
1. planning group选择panda_arm，然后右侧就会显示机械臂拖动的指示标志（旋转和移动）；
2. Goal State选择home（你也可以自己拖动机械臂到一个目标位置）；
3. 点击Plan；
4. 就可以看到右侧机械臂移动了；
  
![](./img/moveit_rviz_01.png)