# multi-thread

```c
void usart1_transmit(uint8_t *buff, uint16_t len)
{
	uint16_t to_send_len;
	uint16_t to_tx_fifo_len;

	osMutexWait(leg0U2MutexHandle, osWaitForever);

	if (usart1_manage_obj.is_sending == 0)
	{
	 if (len < usart1_manage_obj.tx_buffer_size)
	 {
	   to_send_len = len;
	   to_tx_fifo_len = 0;
	 }
	 else if (len < usart1_manage_obj.tx_buffer_size + usart1_manage_obj.tx_fifo_size)
	 {
	   to_send_len = usart1_manage_obj.tx_buffer_size;
	   to_tx_fifo_len = len - usart1_manage_obj.tx_buffer_size;
	 }
	 else
	 {
	   to_send_len = usart1_manage_obj.tx_buffer_size;
	   to_tx_fifo_len = usart1_manage_obj.tx_fifo_size;
	 }
	}
	else
	{
	 if (len < usart1_manage_obj.tx_fifo_size)
	 {
	   to_send_len = 0;
	   to_tx_fifo_len = len;
	 }
	 else
	 {
	   to_send_len = 0;
	   to_tx_fifo_len = usart1_manage_obj.tx_fifo_size;
	 }
	}

	if (to_send_len > 0)
	{
	 memcpy(usart1_manage_obj.tx_buffer, buff, to_send_len);
	 usart1_manage_obj.is_sending = 1;
	 HAL_UART_Transmit_DMA(usart1_manage_obj.uart_h, usart1_manage_obj.tx_buffer, to_send_len);
	}

	osMutexRelease(leg0U2MutexHandle);
    
	if(to_tx_fifo_len > 0){
	  fifo_s_puts(&(usart1_manage_obj.tx_fifo), (char *)(buff) + to_send_len, to_tx_fifo_len);
	}
}

```