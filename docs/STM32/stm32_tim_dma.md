## Method 1
* 配置TIM
* 配置DAM for TIM
* start DAM，流程如下：
```c
                         // enable 
HAL_TIM_PWM_Start_DMA -> HAL_DMA_Start_IT -> __HAL_TIM_ENABLE_DMA


```





HAL_TIM_DMABurst_WriteStart
HAL_DMA_Start