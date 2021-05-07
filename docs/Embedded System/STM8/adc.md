# STM8 ADC

STM8的ADC功能较弱，没有DMA，对多通道AD采集支持不友好。

## 1. 扫描模式

STM8的扫描模式很简陋，只能从AIN0 到 AINn，假如你需要扫描AIN2和AIN6，那么STM8只能做到从AIN0扫描到AIN6：AIN0 -> AIN1 -> AIN2 -> AIN3 -> AIN4 -> AIN5 -> AIN6（不像STM32可以设置扫描顺序，这样就能指定扫描的通道了） 。


## 2. 多通道ADC

STM8的ADC没有DMA（STM8提供了一个数据Buffer），并且其数据寄存器是8位的，ADC是10 bit的，所以需要两个寄存器来存储ADC转换结果。

STM8提供了一个数据Buffer，用来存储多通道ADC采样的转换结果，但是这个Buffer也是8位的，所以从ADC的数据寄存器到Buffer需要Copy两次，并且STM8不保证该数据Copy的原子性。

所以直接读取buffer（ADC1_GetBufferValue()）的话是不安全的，容易发生字节错位。

安全的做法是单次扫描：

```c
uint16_t get_adc_value(ADC1_Channel_TypeDef ADC1_Channel)
{
    /* Start ADC1 conversion */
    ADC1->CR1 |= ADC1_CR1_ADON;
    
    /* Wait for conversion finish */
    while((ADC1->CSR & ADC1_FLAG_EOC)==0);
    /* clear the flag */
    ADC1->CSR &= (uint8_t)~(ADC1_FLAG_EOC);

    // read current
    raw_current_adc = (uint16_t)(*((uint8_t*)0x53E7) | (uint16_t)(*((uint8_t*)0x53E6) << (uint8_t)8));
    
    // read position
    return (uint16_t)(*((uint8_t*)0x53E5) | (uint16_t)(*((uint8_t*)0x53E4) << (uint8_t)8));
}
```

