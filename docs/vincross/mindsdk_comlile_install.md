# MIND SDK安装

## 1. 安装docker

[Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

* Uninstall old versions
Older versions of Docker were called docker, docker.io, or docker-engine. If these are installed, uninstall them:

```
sudo apt-get remove docker docker-engine docker.io containerd runc
```


* Update the apt package index and install packages to allow apt to use a repository over HTTPS:

```
sudo apt-get update
```

```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

* Add Docker’s official GPG key:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Verify that you now have the key with the fingerprint 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88, by searching for the last 8 characters of the fingerprint.

```
$ sudo apt-key fingerprint 0EBFCD88

pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```

Use the following command to set up the stable repository. 

```
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

* INSTALL DOCKER ENGINE

```
 $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## 2. 安装并配置GO开发环境

* 下载GO

[Download GO](https://golang.org/dl/)

考虑兼容问题，建议使用go1.11版本

```
wget https://dl.google.com/go/$go1.11.linux-amd64.tar.gz
```

* 配置GO环境变量

```
export GOROOT=/path/to/go_root_dir
export GOPATH=/path/to/your_go_project
#export GOBIN=$GOROOT/bin
export GOTOOLS=$GOROOT/pkg/tool
export PATH=$GOBIN:$GOTOOLS:$GOROOT/bin:$PATH
```


## 3. 编译

```
make
```