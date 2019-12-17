# 内存对齐

```
__alignof__

[](https://gcc.gnu.org/onlinedocs/gcc-3.3/gcc/Alignment.html#Alignment)
```

[GNU Structure-Layout Pragmas](https://gcc.gnu.org/onlinedocs/gcc/Structure-Layout-Pragmas.html)



[](https://gcc.gnu.org/onlinedocs/gcc-3.3/gcc/Type-Attributes.html)

#pragma pack is a Microsoft syntax that has been ported to GCC for compatibility reasons.

__attribute__((aligned)) is a GCC-specific syntax (unsupported by MSVC).


[](http://www.keil.com/support/man/docs/ARMCC/armcc_chr1359124990875.htm)

Keil ARM编译器默认#pragma pack(8)


__attribute__((packed,aligned(n)))

__attribute__((aligned(n)))


自然对齐（natural alignment）

结构体的自身对齐值：其成员中自身对齐值最大的那个值
指定对齐值
数据对齐是C编译器默认的行为，一般C编译器默认4字节对齐，这就是指定对齐值。

有效对齐值
有效对齐值 = min( 自身对齐值，指定对齐值 )


```

#pragam pack(n)

For each member, if n bytes is less than the natural alignment of the member, then set the alignment to n bytes, otherwise the alignment is the natural alignment of the member. For more information see #pragma pack (n) and __alignof__.

使用伪指令#pragma pack ()，取消自定义字节对齐方式。

```

[](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.100748_0606_00_en/xxq1474359912082.html)

```
__attribute__((packed))

This is equivalent to #pragma pack (1). However, the attribute can also be used on individual members in a structure or union.
```



另外，还有如下的一种方式：

__attribute((aligned (n)))，让所作用的结构成员对齐在n字节自然边界上。如果结构中有成员的长度大于n，则按照最大成员的长度来对齐。

