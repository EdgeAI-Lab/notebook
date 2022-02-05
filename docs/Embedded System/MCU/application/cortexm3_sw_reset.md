# Cortex-M3软件复位

可通过调用CMSIS软件库和编写汇编代码这两种方式来实现软件复位。

## 1.调用库函数

权威指南 SCB

https://blog.csdn.net/anbaixiu/article/details/81155688

* 先关闭中断，再复位

```c
__set_FAULTMASK(1); // 关闭所有中断
NVIC_SystemReset(); // 设置
```

* 关中断操作实现源码
```c
// cmsis_armcc.h

__STATIC_INLINE void __set_FAULTMASK(uint32_t faultMask)
{
  register uint32_t __regFaultMask       __ASM("faultmask");
  __regFaultMask = (faultMask & (uint32_t)1U);
}
```

* 复位实现源码
```c
// core_cm3.h

__NO_RETURN __STATIC_INLINE void __NVIC_SystemReset(void)
{
  __DSB();                                                          /* Ensure all outstanding memory accesses included
                                                                       buffered write are completed before reset */
  SCB->AIRCR  = (uint32_t)((0x5FAUL << SCB_AIRCR_VECTKEY_Pos)    |
                           (SCB->AIRCR & SCB_AIRCR_PRIGROUP_Msk) |
                            SCB_AIRCR_SYSRESETREQ_Msk    );         /* Keep priority group unchanged */
  __DSB();                                                          /* Ensure completion of memory access */

  for(;;)                                                           /* wait until reset */
  {
    __NOP();
  }
}
```

## 2.自己编写汇编代码

```c
__asm void SystemReset(void)
{
 MOV R0, #1           //; 
 MSR FAULTMASK, R0    //; 清除FAULTMASK 禁止一切中断产生
 LDR R0, =0xE000ED0C  //;
 LDR R1, =0x05FA0004  //;
 STR R1, [R0]         //; 系统软件复位   
 
deadloop
    B deadloop        //; 死循环使程序运行不到下面的代码
}
```