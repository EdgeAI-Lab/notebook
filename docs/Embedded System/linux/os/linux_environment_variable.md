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

Variable Types
When a shell is running, three main types of variables are present −

Local Variables − A local variable is a variable that is present within the current instance of the shell. It is not available to programs that are started by the shell. They are set at the command prompt.

Environment Variables − An environment variable is available to any child process of the shell. Some programs need environment variables in order to function correctly. Usually, a shell script defines only those environment variables that are needed by the programs that it runs.

Shell Variables − A shell variable is a special variable that is set by the shell and is required by the shell in order to function correctly. Some of these variables are environment variables whereas others are local variables.


# Shell环境变量

bash shell用一个叫作环境变量（ environment variable）的特性来存储有关shell会话和工作环境的信息（这也是它们被称作环境变量的原因）。这项特性允许你在内存中存储数据，以便程序或shell中运行的脚本能够轻松访问到它们。

在bash shell中，环境变量分为两类：

* 全局变量
* 局部变量 