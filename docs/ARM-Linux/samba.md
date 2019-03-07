# Samba
### 一、安装

```
sudo apt-get install samba
```
* Samba服务默认配置文件头

> 通过 man 5 smb.conf查看配置文件的详细信息

> "#"注释和";"注释的区别


```bash

# Sample configuration file for the Samba suite for Debian GNU/Linux.
#
#
# This is the main Samba configuration file. You should read the
# smb.conf(5) manual page in order to understand the options listed
# here. Samba has a huge number of configurable options most of which
# are not shown in this example
#
# Some options that are often worth tuning have been included as
# commented-out examples in this file.
#  - When such options are commented with ";", the proposed setting
#    differs from the default Samba behaviour
#  - When commented with "#", the proposed setting is the default
#    behaviour of Samba but the option is considered important
#    enough to be mentioned here
#
# NOTE: Whenever you modify this file you should run the command
# "testparm" to check that you have not made any basic syntactic
# errors.


```

### 二、配置

2.1. 打开Samba配置文件
```
sudo vim /etc/samba/smb.conf
```

2.2. 配置共享Home目录

> 假如你只有一个samba用户，那么只需要共享Home目录即可满足需求。

> 多人使用的Samba服务，请参看2.3节

```bash
# Un-comment the following (and tweak the other settings below to suit)
# to enable the default home directory shares. This will share each
# user's home directory as \\server\username
[homes]
   comment = Home Directories
   browseable = no #不允许浏览，其他用户登录时看不到此文件夹

# By default, the home directories are exported read-only. Change the
# next parameter to 'no' if you want to be able to write to them.
   read only = no
   
# File creation mask is set to 0700 for security reasons. If you want to
# create files with group=rw permissions, set next parameter to 0775.
;   create mask = 0700

# Directory creation mask is set to 0700 for security reasons. If you want to
# create dirs. with group=rw permissions, set next parameter to 0775.
;   directory mask = 0700

# By default, \\server\username shares can be connected to by anyone
# with access to the samba server.
# Un-comment the following parameter to make sure that only "username"
# can connect to \\server\username
# This might need tweaking when using external authentication schemes
;   valid users = %S
   
```
* "#"注释和";"注释的区别，请参看smb.conf文件头部
* valid users = xxx,yyy,zzz “有效的访问用户” 指的是只有用户xxx,yyy,zzz才可以访问\\server\xxx
* valid users = %S 其中%S指的是当前登录的用户



2.3. 为特定的用户指定共享文件夹

```bash

[xxx's shared folder]
   comment = Home Directories
   path = /home/xxx/sharedFolder
   browseable = no       #不允许浏览，其他用户登录时看不到此文件夹
   read only = no        #可读写
   create mask = 0700    #新建文件权限，根据自己需求配置
   directory mask = 0700 #新建文件夹权限，根据自己需求配置
   valid users = xxx     #指定有效用户

```
* 通过create mask和directory mask控制文件和文件夹的访问权限
* 可使用分组的形式，实现不同用户拥有不同的访问权限
* [Optional]通过Samba服务配置文件write list = user1,user2

### 三、常用指令

!!! warning
    在某些电脑上，有时restart配置不能重新生效，只能先stop然后在start，具体原因没有深究

```
sudo service smbd status       #查看smd服务的状态
sudo service smbd start        #运行smb服务
sudo service smbd stop         #停止服务
sudo service smbd restart      #重启服务，但在实际中一般不采用
sudo service smbd reload       #重载服务，在实际中较常用，不用停止服务

```

### 四、创建samba用户

!!! Warning
    普通用户不可用，必须使用smbpasswd创建samba用户!

```
useradd tst1_samba
sudo smbpasswd -a tst1_samba # -a add user
```

### 五、Windows下注销用户

```
net use * /del
```
### 六、参考链接

!!! important
    参考链接，很重要！！！

* [smb.conf](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)
* man 5 smb.conf
