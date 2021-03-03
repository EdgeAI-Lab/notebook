# STM32调试记录


## drv_uart.c 能够触发串口接收中断，但是收到的数据长度为0

调试发现其DMA的CNDTR寄存器始终为一个定值，从现象上看应该是DMA出现问题，故查看DMA配置，
在ST的HAL库中，一旦串口接收发生错误，将会把相应串口的DMA接收关闭。

解决方案：

```c
void HAL_UART_ErrorCallback(UART_HandleTypeDef *huart)
{
	if (huart == &huart1){
		HAL_UART_Receive_DMA(&huart1, usart1_rx_buff, USART1_RX_BUFFER_SIZE);
	}else if(huart == &huart2){
		HAL_UART_Receive_DMA(&huart2, usart2_rx_buff, USART2_RX_BUFFER_SIZE);
	}
}
```

## 任务切换时崩溃

通常是因为任务栈的空间不够，跟调用者任务和被调用者任务的栈大小都有关系。
