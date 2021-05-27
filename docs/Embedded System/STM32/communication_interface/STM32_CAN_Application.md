# STM32 CAN接口


## 1. CAN1(Master CAN) and CAN2(Slave CAN)
![](./img/CAN/STM32_Dual_CAN.png)

CAN1口是master mode，而CAN2口是slave mode，
跟这个SLAVE MODE是没有关系的，这个只是说CAN2是没有自己的过滤器，而是共享了CAN1的过滤器组，所以CAN2就叫SLAVE了。

部分STM32芯片具有双CAN模块，从整体功能上讲，两个CAN是独立的。但是，两个CAN共用过滤器管理模块，对于STM32芯片来讲，该过滤器控制模块由CAN1统一管理，所以即使只是单独使用CAN2进行收发，也须开启CAN1，否则会因为过滤器未能开启，导致单独使用CAN2时无法收发的情形。

## 2. CAN Filter
[STM32 CAN过滤器](https://blog.csdn.net/jixiangrurui/article/details/39370027)


## 

