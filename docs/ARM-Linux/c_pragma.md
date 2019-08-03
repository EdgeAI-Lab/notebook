# ```#pragma pack```

## 1.#pragma pack使用说明
```c
#pragma pack(1)

#pragma pack()

```

这是给编译器用的参数设置，有关结构体字节对齐方式设置， #pragma pack是指定数据在内存中的对齐方式。

```c
#pragma pack (n) // C编译器将按照n个字节对齐。
#pragma pack ()  // 取消自定义字节对齐方式。
```

```c
#pragma pack (push,1) // 是指把原来对齐方式设置压栈，并设新的对齐方式设置为一个字节对齐
#pragma pack(pop)      // 恢复对齐状态

```

因此可见，加入push和pop可以使对齐恢复到原来状态，而不是编译器默认。


## 2.示例

### 2.1不使用#pragma pack
```c
#include <stdio.h>

struct sample{
	char a;
	double b;
};

int main()
{

	struct sample sple;
	sple.a = 'O';
	sple.b = 12.445;

	// 结果是16，因为结构体在存储时，是以结构体成员中占内存最多的数据类型所占的字节数为标准，
	// 所有的成员在分配内存时都要与这个长度对齐，所以本例中char占8个字节，double占8字节
	printf("%d\n",sizeof(sple)); 
	
    return 0;

```

### 2.2使用#pragma pack
```c
#include <stdio.h>

#pragma pack(1)  // 使结构体按1字节方式对齐
struct sample{
	char a;
	double b;
};
#pragma pack()

int main()
{

	struct sample sple;
	sple.a = 'O';
	sple.b = 12.445;

	// 结果是9，因为使用#pragma pack(1)后，
	// 结构体sample为1字节对齐，char占1字节，double占8字节
	printf("%d\n",sizeof(sple)); 
	
    return 0;

```