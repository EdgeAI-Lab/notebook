## Hexo配置

### 1.在右上角或者左上角实现fork me on github
[右上角](http://tholman.com/github-corners/)
[左上角](https://github.blog/2008-12-19-github-ribbons/)

### 2.主页文章添加阴影效果

#### 2.1 打开\themes\next\source\css\_custom\custom.styl,向里面加入：

```html

// 主页文章添加阴影效果
 .post {
   margin-top: 60px;
   margin-bottom: 60px;
   padding: 25px;
   -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);
   -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);
  }
```

### 3.在网站底部加上访问量
* [不蒜子](http://busuanzi.ibruce.info/)

打开\themes\next\layout\_partials\footer.swig文件,在copyright前加上画红线这句话：
```html
<script async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>

```
然后在\themes\next\layout\_partials\footer.swig

```html
{% if theme.footer.powered.enable %}
# add
  <div class="powered-by">
  <i class="fa fa-user-md"></i><span id="busuanzi_container_site_uv">
    本站访客数:<span id="busuanzi_value_site_uv"></span>
  </span>
  </div>
# add  
  <span class="post-meta-divider">|</span>
  
  <div class="powered-by">{#
  #}{{ __('footer.powered', next_url('https://hexo.io', 'Hexo', {class: 'theme-link'})) }}{#
  #}{% if theme.footer.powered.version %} v{{ hexo_env('version') }}{% endif %}{#
 #}</div>
{% endif %}
```


