# C语言操作串口

## 1.配置串口访问权限

首先确定使用的串口设备文件：

```
$ ll /dev/ttyU*

crw-rw---- 1 root dialout 188, 0 Nov 11 14:22 /dev/ttyUSB0
```

一般普通用户是没有权限直接访问串口设备的，有两种处理方式：

* 临时修改串口设备文件的访问权限

```
sudo chmod 777 /dev/ttyUSB0
```

配置后立即生效

* 将当前用户添加进 dialout 用户组

命令格式：

```
usermod -aG {group-name} username
```

eg:
```
sudo usermod -aG dialout your_user_name
```

查看是否设置成功：

```
$ grep 'dialout' /etc/group
```

配置后重启生效

## 2.打开并配置串口

* 打开串口
```c
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int fd = open("/dev/ttyUSB0",O_RDWR|O_NONBLOCK);

```

* 配置波特率

```c
#include <termios.h>

set_speed(fd,115200);

int baudrate_arrt[] = {
	B115200,
	B57600,
	B38400,
	B19200,
	B9600,
	B4800,
	B2400,
	B1200,
	B300,
	B38400,
	B19200,
	B9600,
	B4800,
	B2400,
	B1200,
	B300,
};

int name_arrt[] = {
	115200,
	57600,
	38400,
	19200,
	9600,
	4800,
	2400,
	1200,
	300,
	38400,
	19200,
	9600,
	4800,
	2400,
	1200,
	300,
};

void set_baudrate(int fd, int speed)
{
	int i;
	int status;
	struct termios Opt;
	tcgetattr(fd, &Opt);
	for (i = 0; i < sizeof(baudrate_arrt) / sizeof(int); i++)
	{
		if (speed == name_arrt[i]){
			tcflush(fd, TCIOFLUSH);
			cfsetispeed(&Opt, baudrate_arrt[i]);
			cfsetospeed(&Opt, baudrate_arrt[i]);
			status = tcsetattr(fd, TCSANOW, &Opt);
			if (status != 0)
				perror("tcsetattr fd");
			return;
		}
		tcflush(fd, TCIOFLUSH);
	}
}
```

* 配置串口数据位，停止位和校验位

```c

#include <termios.h>
#include <stdio.h>

/**
*@brief   设置串口数据位，停止位和效验位
*@param  fd     类型  int  打开的串口文件句柄*
*@param  databits 类型  int 数据位   取值 为 7 或者8*
*@param  stopbits 类型  int 停止位   取值为 1 或者2*
*@param  parity  类型  int  效验类型 取值为N,E,O,,S
*/

set_Parity(fd,8,1,'N');

int set_Parity(int fd, int databits, int stopbits, int parity)
{
	struct termios options;
	if (tcgetattr(fd, &options) != 0)
	{
		perror("SetupSerial 1");
		return (FALSE);
	}
	options.c_cflag &= ~CSIZE;
	switch (databits) /*设置数据位数*/
	{
	case 7:
		options.c_cflag |= CS7;
		break;
	case 8:
		options.c_cflag |= CS8;
		break;
	default:
		fprintf(stderr, "Unsupported data size\n");
		return (FALSE);
	}
	switch (parity)
	{
	case 'n':
	case 'N':
		options.c_cflag &= ~PARENB; /* Clear parity enable */
		options.c_iflag &= ~INPCK;	/* Enable parity checking */
		break;
	case 'o':
	case 'O':
		options.c_cflag |= (PARODD | PARENB); /* 设置为奇效验*/
		options.c_iflag |= INPCK;			  /* Disnable parity checking */
		break;
	case 'e':
	case 'E':
		options.c_cflag |= PARENB;	/* Enable parity */
		options.c_cflag &= ~PARODD; /* 转换为偶效验*/
		options.c_iflag |= INPCK;	/* Disnable parity checking */
		break;
	case 'S':
	case 's': /*as no parity*/
		options.c_cflag &= ~PARENB;
		options.c_cflag &= ~CSTOPB;
		break;
	default:
		fprintf(stderr, "Unsupported parity\n");
		return (FALSE);
	}
	/* 设置停止位*/
	switch (stopbits)
	{
	case 1:
		options.c_cflag &= ~CSTOPB;
		break;
	case 2:
		options.c_cflag |= CSTOPB;
		break;
	default:
		fprintf(stderr, "Unsupported stop bits\n");
		return (FALSE);
	}
	/* Set input parity option */
	if (parity != 'n')
		options.c_iflag |= INPCK;


	options.c_cflag &= ~CRTSCTS; // Disable RTS/CTS hardware flow control (most common)
	options.c_cflag |= CREAD | CLOCAL; // Turn on READ & ignore ctrl lines (CLOCAL = 1)

	options.c_lflag &= ~ICANON;
	options.c_lflag &= ~ECHO; // Disable echo
	options.c_lflag &= ~ECHOE; // Disable erasure
	options.c_lflag &= ~ECHONL; // Disable new-line echo
	options.c_lflag &= ~ISIG; // Disable interpretation of INTR, QUIT and SUSP
	options.c_iflag &= ~(IXON | IXOFF | IXANY); // Turn off s/w flow ctrl
	options.c_iflag &= ~(IGNBRK|BRKINT|PARMRK|ISTRIP|INLCR|IGNCR|ICRNL); // Disable any special handling of received bytes

	options.c_oflag &= ~OPOST; // Prevent special interpretation of output bytes (e.g. newline chars)
	options.c_oflag &= ~ONLCR; // Prevent conversion of newline to carriage return/line feed
	
	options.c_cc[VTIME] = 150; // 15 seconds
	options.c_cc[VMIN] = 0;

	tcflush(fd, TCIFLUSH); /* Update the options and do it NOW */
	if (tcsetattr(fd, TCSANOW, &options) != 0)
	{
		perror("SetupSerial 3");
		return (FALSE);
	}
	return (TRUE);
}
```

## 3.读写数据

```c
void *recv_thread(void *args)
{
    char c=0;
    while (1)
    {
        if(read(fd,&c,1)>0){
            printf("%d\n",c);
        }
    }
    
}

void *send_thread(void *args)
{
    char c=0;
    while (1)
    {
        write(fd,&c,1);
        c++;
        sleep(1);
    }  
}

int main(int argc, char const *argv[])
{
    pthread_t recv_tid;
    pthread_t send_tid;

    fd = open("/dev/ttyUSB0",O_RDWR); // |O_NONBLOCK

    if (fd>0)
	    set_speed(fd,115200);
	else{
	    printf("Can't Open Serial Port!\n");
	    _exit(0);
	}
	if (set_Parity(fd,8,1,'N')== FALSE){
	    printf("Set Parity Error\n");
	    _exit(1);
	}

    pthread_create(&recv_tid,NULL,recv_thread,NULL);
    pthread_create(&send_tid,NULL,send_thread,NULL);

    pthread_join(recv_tid,NULL);
    pthread_join(send_tid,NULL);

    return 0;
}
```