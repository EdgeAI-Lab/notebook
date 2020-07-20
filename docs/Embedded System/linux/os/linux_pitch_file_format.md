# linux补丁文件格式

“补丁” 指的是文件之间一系列差异。

在原始文件的基础上进行修改后，然后根据所做的修改生成补丁文件（使用diff命令）。

一个持有原始文件的人，将该补丁打到原始文件上（使用patch命令），就变成了修改后的文件。


## 1. 创建两个实验文件

* 原文件：1.txt

```txt
this is a test
for patch file format
so let us go!
```

* 修改后的文件：2.txt
```txt
this is a test
for linux patch file format
so let us go!
learn it
```

## 2. 生成补丁文件

```bash
diff -u 1.txt 2.txt > diff.patch

vim diff.patch
```

生成的补丁文件内容如下：

```vim
1 --- 1.txt       2020-07-20 16:45:27.131654289 +0800
2 +++ 2.txt       2020-07-20 16:46:26.348728016 +0800
3 @@ -1,3 +1,4 @@
4  this is a test
5 -for patch file format
6 +for linux patch file format
7  so let us go!
8 +learn it
```


## 3.补丁头

```
1 --- 1.txt       2020-07-20 16:45:27.131654289 +0800
2 +++ 2.txt       2020-07-20 16:46:26.348728016 +0800
```
"---" 表示旧文件（原文件）

"+++" 表示新文件（修改后的文件）

补丁头记录了原始文件和修改后的文件的文件名和创建时间。

## 4.块

补丁中的块是用来说明文件的改动情况。他们通常以```@@开始，结束于另一个块的开始或者一个新的补丁头```。

```vim
3 @@ -1,3 +1,4 @@
4  this is a test
5 -for patch file format
6 +for linux patch file format
7  so let us go!
8 +learn it
```

## 5.块的缩进

```vim
3 @@ -1,3 +1,4 @@
4  this is a test
5 -for patch file format
6 +for linux patch file format
7  so let us go!
8 +learn it
```

块会缩进一列，该列有三种情况：

* 以 "-" 开头的行，表示改行只在原始文件中存在，比如第5行

* 以 "+" 开头的行，表示改行只在修改后的文件中存在，比如第6行和第8行

* 以空格开头的行，表示改行在原始文件和修改后的文件中都存在，比如第4行和第7行


从打补丁的角度来看，这一列是用来表示这一行是要增加还是要删除的；

* 以 "-" 开头的行是要删除的

* 以 "+" 开头的行是要加上的

* 以空格开头的行保持不变