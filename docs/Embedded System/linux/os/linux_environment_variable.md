# Linux Environment Variable

* refer link:

* [link1](https://help.ubuntu.com/community/EnvironmentVariables)
* [link2](https://askubuntu.com/questions/866161/setting-path-variable-in-etc-environment-vs-profile#:~:text=%2Fetc%2Fenvironment%20is%20a%20system,is%20used%20by%20all%20users.&text=profile%20for%20each%20user.,scripts%20in%20%2Fetc%2Fprofile.)
* [link3](https://www.ibm.com/support/knowledgecenter/ssw_aix_72/osmanagement/sys_startup_files.html)

## 1. /etc/environment

全局环境变量


## 2. /etc/profile

全局环境变量，针对shell生效

## 3. ~/.profile

用户环境变量，针对shell生效

## 4. 修改环境变量后，如何使其生效

```shell
source ~/.profile
```