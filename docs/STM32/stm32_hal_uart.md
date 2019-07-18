# STM32串口操作-中断

## 1.使用CubeMX进行串口配置

!!! Note
    System Core配置略
	
![](../assets/images/STM32/UART/usart1_IT_configure.png)




## 2.开启中断
在main.c中添加

```c

  /* USER CODE BEGIN 2 */
   // 
   HAL_UART_Receive_IT(&huart1, (uint8_t *)aRxBuffer, 10);
  /* USER CODE END 2 */

```











