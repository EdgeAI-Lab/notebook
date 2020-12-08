# Git



* 获取远程指定分支

> 从远程仓库里拉取一条本地不存在的分支时

```bash

git checkout -b new_local_branch_name origin/remote_branch_name

```

* 以图形的方式查看分支之间的关系
```bash

gitk --simplify-by-decoration --all

```

## Git创建空白（孤儿）分支

* 创建一个空白分支

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

* 创建一个以当前节点为基础的独立分支

```
// 创建并切换到新分支
git checkout --orphan <branch_name>

// 将当前所有文件提交
git commit -a

```

* git删除已经提交的文件

```c

git rm -r --cached xxx // xxx是你要删除的文件，本命令执行完之后，在.gitignore文件中添加上该需要删除的文件
git add .
git commit -m "update .gitignore"
git push -f origin master // 强推

```

* git强制拉取远程分支更新

> 假设你工作在master分支

```bash
# 获取远程分支的内容
git fetch -all 

# 指向新的分支
git reset --hard origin/master  

```

* tags

```bash
git tag -a v1.0 -m "first version"
```

```
# delete local tag
git tag -d v1.0

# delete remote tag
git push :refs/tags/v1.0
```

* git change the last commit 

```
git commit --amend
```

* git GUI dispay  - 
```
gitk
```

* git merge branch - 
```
git merge branch1 branch2
```
* cancel the merge - 
```
git merge --abort
```
* git delete local branch
```
git branch -d branch_name
```

* git delete remote branch

```
git push origin --delete branch_name   or git push origin :remote_branch_name
```
* git remote show origin

* git show all branchs
```
git branch -a
```
