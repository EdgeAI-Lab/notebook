# GNU 链接脚本

装载地址：二进制应用程序文件应该存储的地方

运行地址：程序运行时应该在的地方


[GNU链接脚本](http://www.scoberlin.de/content/media/http/informatik/gcc_docs/ld_3.html)


## MEMORY command

The linker's default configuration permits allocation of all available memory. You can override this by using the MEMORY command.

The MEMORY command describes the location and size of blocks of memory in the target. You can use it to describe which memory regions may be used by the linker, and which memory regions it must avoid. You can then assign sections to particular memory regions. The linker will set section addresses based on the memory regions, and will warn about regions that become too full. The linker will not shuffle sections around to fit into the available regions.

A linker script may contain at most one use of the MEMORY command. However, you can define as many blocks of memory within it as you wish. The syntax is:

```
MEMORY 
  {
    name [(attr)] : ORIGIN = origin, LENGTH = len
    ...
  }
```


## Output section LMA
Every section has a virtual address (VMA) and a load address (LMA); see section Basic Linker Script Concepts. The address expression which may appear in an output section description sets the VMA (see section Output section address).

<font color="red">The linker will normally set the LMA equal to the VMA.You can change that by using the AT keyword. The expression lma that follows the AT keyword specifies the load address of the section.</font> 


```
/* Initialized data sections into "RAM" Ram type memory */
  .data : 
  {
    . = ALIGN(4);
    _sdata = .;        /* create a global symbol at data start */
    *(.data)           /* .data sections */
    *(.data*)          /* .data* sections */

    . = ALIGN(4);
    _edata = .;        /* define a global symbol at data end */
    
  } >RAM AT> FLASH /*运行地址在RAM中，执行地址在FLASH中*/
```

