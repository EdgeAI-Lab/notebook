# Task Notifications

* 同一时间多次发送任务通知，会被覆盖

```c
void TaskA(void *argument)
{
	osThreadFlagsSet(TaskBHandle,START_SEND_CMD);
	osDelay(1);
	osThreadFlagsSet(TaskBHandle,START_SEND_CMD);
	osDelay(1);
	osThreadFlagsSet(TaskBHandle,START_SEND_CMD);
	osDelay(1);

  for(;;)
  {
    osDelay(1000);
  }
}
```


```c
void TaskB(void *argument)
{

  /* 延时3秒，等待任务A发送完任务通知 */
  osDelay(3000);

  for(;;)
  {
	osThreadFlagsWait(START_SEND_CMD,osFlagsWaitAll,osWaitForever;
    osDelay(3000);
    cnt++;
  }

}
```

假设TaskA的优先级不小于TaskB，则TaskA将优先发送完3次任务通知给TaskB，试验结果是TaskB的任务只会执行1次。