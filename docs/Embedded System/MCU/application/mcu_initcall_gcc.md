# MCU上实现initcall机制

GNU Linker

```
  .icode :
  {
    . = ALIGN(4);
    KEEP(*(.icode))
    . = ALIGN(4);
  } >FLASH
```