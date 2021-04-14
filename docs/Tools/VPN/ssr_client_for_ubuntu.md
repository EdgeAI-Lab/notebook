# SSR for Ubuntu

[参考链接](https://arcdetri.github.io/shadowsocksr-ssr-on-ubuntu.html)


## Client

Now we work on the host PC, which is also running Ubuntu 18.04. Update existing packages:

```
sudo apt update
sudo apt upgrade
```

## Download

Install on your local Ubuntu host the prerequisite packages for the SSR Python client:

```
sudo apt install wget zip unzip python-m2crypto libsodium23
```

We are going to install ShadowsocksR into our Downloads directory, so change into that directory:

```
cd ~/Downloads
```

Get the source either from Github:

```
wget https://github.com/shadowsocksrr/shadowsocksr/archive/manyuser.zip
```

Or from a mirror:

```
wget https://s3.tok.ap.cloud-object-storage.appdomain.cloud/xzdl/manyuser.zip
```

Check the integrity of the downloaded zip file with the sha256sum command:

```
sha256sum manyuser.zip
```

The SHA256 checksum should match the value stated earlier in this post.

Unzip the download:

```
unzip manyuser.zip
```

Rename the extracted directory:

mv shadowsocksr-manyuser shadowsocksr

Configure
Edit your initial ShadowsocksR configuration file.

```
sudo vi /etc/shadowsocks.json
```

You can start with the template below. Of course, you must substitute in your values for the ShadowsocksR server IP address, port, password, encryption method, protocol, obfuscation method, and so on. In this template, the public IP address of the server is given as 3.4.5.6 as an example.

Press the i key on your keyboard to get into insert mode.

```json
{
"server":"3.4.5.6",
"server_ipv6":"::",
"server_port":80,
"local_address":"127.0.0.1",
"local_port":1080,
"password":"86tufeE96hJJrdjr",
"timeout":300,
"udp_timeout":60,
"method":"none",
"protocol":"auth_chain_a",
"protocol_param":"",
"obfs":"http_post",
"obfs_param":"",
"fast_open":false,
"workers":1
}
```

When you have finished editing, write the file to disk and quit the editor.

Start
Change into the directory for the single-user version of SSR:

```
cd shadowsocksr/shadowsocks
```

Start the ShadowsocksR client running as a daemon:

```
sudo python local.py -c /etc/shadowsocks.json -d start
```

Check that it is running okay:

sudo tail /var/log/shadowsocksr.log

Configure Firefox
Open Firefox. Configure Firefox to send traffic to localhost port 1080.


* From the Firefox menu, select Preferences
* You should be on the General page
* Scroll down to Network Settings
* Click Settings
* Select Manual proxy configuration
* For SOCKS Host, type 127.0.0.1
* For Port, type 1080
* Select SOCKS v5
* Select Proxy DNS when using SOCKS v5
* Click OK