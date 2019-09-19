# 在Ubuntu系统中配置Java开发环境

## 1.安装Java

* OpenJDK

```bash
# 点击Tab键系统会列出所有可用版本的OpenJDK
sudo apt install openjdk[-Tab key-]

```


## 2.设置Java环境变量

```bash

vim /etc/profile

JAVA_HOME=
JRE_HOME=


```

## 3.设置系统默认Java版本

```bash

update-alternatives --config java

```







