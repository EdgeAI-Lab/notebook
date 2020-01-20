# VIM使用

## 1. 分屏打开文件

* 竖直分屏
```
vim -On file1 file2
```

* 垂直分配

```
vim -0n file1 file2
```

## 2. 切换分屏

* 顺序切换

```
ctrl + w w
```

* 按照方向切换

```
ctrl + w 方向键
```

## 3. 调整分屏尺寸

* 调整高度
```
ctrl + w +/-
```

* 调整宽度

```
# 等宽
ctrl + w = 

# 左右调整
ctrl + w < 或者 >
```

## 4. 关闭分屏

```
ctrl + w c

# 假如是最后一屏，则退出vim
ctrl + w q
```