# STM32串口操作-中断

## 1.使用CubeMX进行串口配置

!!! Note
    System Core配置略
	
![](../assets/stm32/UART/usart1_IT_configure.png)




## 2.开启中断
```
  /**
  * @brief  Receives an amount of data in non blocking mode. 
  * @param  huart: pointer to a UART_HandleTypeDef structure that contains
  *                the configuration information for the specified UART module.
  * @param  pData: Pointer to data buffer
  * @param  Size: Amount of data to be received
  * @retval HAL status
  */

  /* USER CODE BEGIN 2 */
  HAL_UART_Receive_IT(&huart1, (uint8_t *)aRxBuffer, 10);
  /* USER CODE END 2 */

```











