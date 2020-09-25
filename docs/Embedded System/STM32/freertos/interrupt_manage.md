# Interrupt Manager

* If the API function was called from a task

If configUSE_PREEMPTION is set to 1 in FreeRTOSConfig.h then the switch to the higher 
priority task occurs automatically within the API function—so before the API function has 
exited. This has already been seen in Figure 43, where writing to the timer command 
queue resulted in a switch to the RTOS daemon task before the function that wrote to the 
command queue had exited. 

* If the API function was called from an interrupt

A switch to a higher priority task will not occur automatically inside an interrupt. Instead, a 
variable is set to inform the application writer that a context switch should be performed. 
Interrupt safe API functions (those that end in “FromISR”) have a pointer parameter called 
pxHigherPriorityTaskWoken that is used for this purpose. 

If a context switch should be performed, then the interrupt safe API function will set *pxHigherPriorityTaskWoken to pdTRUE. 
To be able to detect this has happened, the 
variable pointed to by pxHigherPriorityTaskWoken must be initialized to pdFALSE before it 
is used for the first time.

If the application writer opts not to request a context switch from the ISR, then the higher 
priority task will remain in the Ready state until the next time the scheduler runs—which in 
the worst case will be during the next tick interrupt.

FreeRTOS API functions can only set *pxHighPriorityTaskWoken to pdTRUE. If an ISR 
calls more than one FreeRTOS API function, then the same variable can be passed as the 
pxHigherPriorityTaskWoken parameter in each API function call, and the variable only 
needs to be initialized to pdFALSE before it is used for the first time.