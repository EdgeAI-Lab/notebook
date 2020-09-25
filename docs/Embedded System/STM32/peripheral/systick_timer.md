# Systick Timer

## 1.在CubeMX中的初始化

此时SystemCoreClock的初始值为16000000，所以此时systick的时间间隔可能不是1ms

```
 HAL_Init() -> HAL_InitTick(TICK_INT_PRIORITY) -> HAL_SYSTICK_Config(SystemCoreClock / (1000U / uwTickFreq))
```

在配置时钟的时候，对systick重新进行了正确的初始化，之后systick的间隔就是1ms了

```
SystemClock_Config() -> HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) -> 

/* Update the SystemCoreClock global variable */
  SystemCoreClock = HAL_RCC_GetSysClockFreq() >> AHBPrescTable[(RCC->CFGR & RCC_CFGR_HPRE) >> RCC_CFGR_HPRE_Pos];

  /* Configure the source of time base considering new system clocks settings*/
  HAL_InitTick(uwTickPrio);

```
