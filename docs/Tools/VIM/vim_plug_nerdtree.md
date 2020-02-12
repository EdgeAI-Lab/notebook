# VIM 安装使用NERDTree插件

## 1.使用VIM-Plug安装NERDTree插件

### 1.1 Download plug.vim and put it in the "autoload" directory

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

* [Reference site](https://github.com/junegunn/vim-plug)

### 1.2 Download NERDTree

```
# dowmload NERDTree
git clone https://github.com/preservim/nerdtree.git ~/.vim/pack/vendor/start/nerdtree

# vim -u NONE 忽略.vimrc文件启动vim
# -c "helptags ~/.vim/pack/vendor/start/nerdtree/doc" 将NERD的帮助文档添加到VIM的帮助文档中
# -c q 执行退出命令
vim -u NONE -c "helptags ~/.vim/pack/vendor/start/nerdtree/doc" -c q
```

### 1.3 Configure VIM-Plug

```
# 打开你的.vimrc配置文件
vim .vimrc

# 添加以下内容
call plug#begin()
Plug 'preservim/nerdtree'
call plug#end()
autocmd VimEnter * NERDTree
```

### 1.4 Install NERDTree

首先启动vim，然后按下 : 键，输入以下命令：

```
PlugInstall
```



 
