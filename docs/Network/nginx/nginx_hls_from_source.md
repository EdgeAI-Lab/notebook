# 配置HLS服务器（从Nginx源码开始）

## 一、卸载Ubuntu预安装的nginx

Ubuntu预安装了nginx，但我们希望从源码编译安装使用，所以首先卸载Ubuntu预装的nginx。

```shell
# 列出nginx相关软件
dpkg --get-selections|grep nginx


# 将上面指令列出的软件一一卸载
sudo apt-get --purge remove nginx
sudo apt-get --purge remove nginx-common
sudo apt-get --purge remove nginx-core

```

## 二、从源码安装nginx

### 2.1.下载源码
* [nginx官网下载地址](http://nginx.org/en/download.html)

### 2.2.编译安装

* 使用nginx默认配置

```
./configure

make

make install

```


* 使用[nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)


```shell
./configure --add-module=/path/to/nginx-rtmp-module
make
make install
```

### 2.3.查看80端口使用情况

```shell
lsof -i:80
# 或者
netstat -tunlp | grep 80
```

* 如果80端口已被别的程序绑定，那么请修改配置文件中的端口 ``` sudo vim /user/local/nginx/conf/nginx.conf ```，或者杀死占用80端口的程序

### 2.4.启动nginx

* 先进入nginx的安装目录 ``` /user/local/nginx/sbin ```
* 运行nginx ``` sudo ./nginx ```


### 2.5.查看nginx是否正确运行

```shell
ps -ef | grep nginx
```

### 2.6.停止nginx

```shell
sudo nginx -s stop
# 或者直接kill
sudo kill -9 nginx_pid
```

## 三、nginx配置

* HLS服务器

```

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}

rtmp {    
    server {
        listen 1935;  
        chunk_size 4000;
        application hls { 
            live on;
            hls on;
            hls_path /tmp/hls;    
            hls_fragment 5s;    
        }
    }
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

	# This URL provides RTMP statistics in XML
        location /stat {
            rtmp_stat all;

            # Use this stylesheet to view XML as web page
            # in browser
            rtmp_stat_stylesheet stat.xsl;
        }

        location /stat.xsl {
            # XML stylesheet to view RTMP stats.
            # Copy stat.xsl wherever you want
            # and put the full directory path here
            root /path/to/stat.xsl/;
        }

        location /hls {
            # Serve HLS fragments
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /tmp;
            add_header Cache-Control no-cache;
        }

        location /dash {
            # Serve DASH fragments
            root /tmp;
            add_header Cache-Control no-cache;
        }
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```
