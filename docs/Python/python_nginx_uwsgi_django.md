# 将Django Wbe APP部署到Nginx服务器

## 1.Python环境设置

这里我们使用python3

* 安装python3-venv
```
$ sudo apt-get install python3-venv
```

* 设置Python3虚拟工作环境
```
$ mkdir /home/fhc/python_env
$ python3 -m venv home/fhc/python_env/django
$ source home/fhc/python_env/django/bin/activate
```

## 2. 创建第一个Django Web App

* 创建Web App
```
$ django-admin.py startproject mysite
$ cd mysite
```

* 运行Web App

我们这里使用Diango内置的一个测试级别的web服务器，请勿在生产环境使用该测试级别的Web服务器。

```
$ python manage.py runserver 0.0.0.0:8000
```

然后你就可以在浏览器地址栏输入http://your_ip:8000/ (eg: http://192.168.1.8:8000/) 访问该网站了。

可能会出现下面的错误信息：

![](../assets/images/python/web/Django.png)

将服务器IP地址或者域名写入mysite/settings.py中：

```python
ALLOWED_HOSTS = ['192.168.1.8']
```

## 3. 安装uWSGI

* WSGI原理
![](../assets/images/python/web/uWSGI_theory.png)

```
# 请先确认你的python版本
sudo apt-get install python3.6-dev
sudo apt-get install gcc
pip install uwsgi
```

编写一个测试文件 test.py，然后测试是否安装正确:

```python
def application(env, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b"Hello World!"]
```

执行如下命令：
```
uwsgi --http :8000 --wsgi-file test.py
```

然后在浏览器地址栏输入http://your_ip:8000/，如果看到如下界面，就说明你的安装时正确的：

![](../assets/images/python/web/uwsgi_browser.png)

* 使用UWSGI访问你的Django Web App

```
uwsgi --http :8000 --module mysite.wsgi
```

## 4.使用Nginx


* Nginx配置

打开配置文件：
```
$ vim /etc/nginx/sites-available/mysite
```

在配置文件中写入下面的内容：

```
# the upstream component nginx needs to connect to
upstream django {
    server unix:///home/fhc/web/mysite/mysite.sock;
}
# configuration of the server
server {
    listen      80;
    server_name localhost;
    charset     utf-8;
    # max upload size
    client_max_body_size 75M;

    # Django media and static files
    location /media  {
        alias /home/fhc/web/mysite/media;
    }

    location /static {
        alias /home/fhc/web/mysite/static;
    }

    # Send all non-media requests to the Django server.
    location / {
        uwsgi_pass  django;
        include     /home/fhc/web/mysite/uwsgi_params;
    }
}
```

启动：
```
uwsgi --socket mysite.sock --module mysite.wsgi --chmod-socket=666
```