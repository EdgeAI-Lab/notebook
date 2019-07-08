# C语言宏定义#与##

* "#" 字符串化

```c

#include <stdio.h>

typedef struct os_thread_def  {
  char            *name;        ///< Thread name
  int             pthread;      ///< start address of thread function
  int             tpriority;    ///< initial thread priority
  int             instances;    ///< maximum number of instances of that thread function
  int             stacksize;    ///< stack size requirements in bytes; 0 is default stack size
} osThreadDef_t;

#define osThreadDef(name, thread, priority, instances, stacksz)  \
const osThreadDef_t os_thread_def_##name = \
// #name 将变为name字符串
{ #name, (thread), (priority), (instances), (stacksz)}


int main()
{
	osThreadDef(defaultTask, 0, 0, 0, 128);
	printf("%s\n",os_thread_def_defaultTask.name);

    return 0;
}

```

* "##" 标识符拼接
```c
#define TEST(x)  i##x

TEST(2) 相当于 i2

```

