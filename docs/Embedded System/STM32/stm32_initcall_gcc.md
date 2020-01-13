# STM32 initcall机制

GNU Linker

```
  .icode :
  {
    . = ALIGN(4);
    KEEP(*(.icode))
    . = ALIGN(4);
  } >FLASH
```