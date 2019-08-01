# Git

##1.git子模块


## 获取远程指定分支

> 从远程仓库里拉取一条本地不存在的分支时

```bash

git checkout -b new_local_branch_name origin/remote_branch_name

```

##2.以图形的方式查看分支之间的关系
```bash

gitk --simplify-by-decoration --all

```

##3.Git创建空白（孤儿）分支
###3.1 创建一个空白分支

```
// 创建并切换到新分支
git checkout --orphan <branch_name>

// 创建一个空的独立分支
git rm -rf .

// 创建文件并提交（如果没有提交orphan分支将不会生效）
vim README.md

git add README.md

git commit -m "add README.md"

```

###3.2 创建一个以当前节点为基础的独立分支

```
// 创建并切换到新分支
git checkout --orphan <branch_name>

// 将当前所有文件提交
git commit -a

```

### 4.git删除已经提交的文件

```c

git rm -r --cached xxx // xxx是你要删除的文件，本命令执行完之后，在.gitignore文件中添加上该需要删除的文件
git add .
git commit -m "update .gitignore"
git push -f origin master // 强推

```

### 5.git强制拉取远程分支更新

> 假设你工作在master分支

```bash
# 获取远程分支的内容
git fetch -all 

# 指向新的分支
git reset --hard origin/master  

```


