# PWM

## 1.TIM的频率
首先设置TIM时钟的频率：72-1，将时钟分成72份（切一刀分成2份，切71刀分成72份），设置完成后TIM将以这个频率运行，所以TIM每记一个数的时间是1/1000000秒


## 2.PWM的周期

STM32的PWM产生的原理是：TIM计数到ARR设置的值时，算作一个周期

PWM的周期是由ARR自动重载值决定的，



## 2.占空比