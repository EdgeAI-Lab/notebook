# Linux Shell Script Program

## 分支语句
```shell
dir=/home/fhc/dir               # dir和=之间不能有空格

if [ -d "$dir" ]                # if和[之间必须有一个空格，[和-d之间必须有一个空格，   "$dir"和]之间必须有一个空格
then                            # then必须另起一行（或者 f [ -d "$dir" ];then ）
    echo "dir is existed!"
else
    echo "dir isn't existed!"
fi
```

* -d 判断一个文件夹是否存在



## 顺序执行指令
> 上一条指令执行完毕才执行下一条指令

```shell
# 将指令的返回值赋给一个变量，这样本条指令执行完毕，才会继续向下执行
rm_ok=`sudo rm /var/www/html/*` 

cp_ok=`sudo cp xxx xxx`
```