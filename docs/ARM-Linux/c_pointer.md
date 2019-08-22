# C语言指针系列

## 1.指针的指针(二级指针)

```c

typedef struct {
	int *p;
} point_t;


typedef struct {
	point_t *point;
} test_t;

int main()
{
	test_t test;
	// 这么做是错误的，程序会崩溃，
	// 因为test.point指针指向的值是随机的，
	// 所以test.point->p = 0x61ff2c是对一个随机地址进行赋值，
	// 这是不正确的
	test.point->p = 0x61ff2c;
	return 0;
}

```