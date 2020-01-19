# VIM配置

# 1. 安装VIM插件管理器

```
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

```bash
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" 将要安装的插件写在call vundle#begin() 和 call vundle#end() 之间

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
```

## 2. 代码自动补全插件YouCompleteMe安装

因为Vundle安装插件比较慢，所以我们手动安装。

[YouCompleteMe](https://github.com/ycm-core/YouCompleteMe)

```
git clone https://github.com/ycm-core/YouCompleteMe.git ~/.vim/plugged/YouCompleteMe
cd .vim/bundle/YouCompleteMe

git submodule update--init--recursive

./install.py --clang-completer
```

```
let g:ycm_global_ycm_extra_conf = '~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py'
```

