# typedef使用注意

```c
/* opus.c */
struct opus{
	int Fs;
};

```

* 变量定义不在本文件内，只有typedef定时是不能正常使用的
```c
/* main.c */
#include <stdio.h>
#include <stdlib.h>

typedef struct opus opus;

int main()
{
    opus *test_opus;    // it is ok
	
//	test_opus->Fs = 10; // it is error

	printf("Hello");
    return 0;
}


```