# STM8 ADC

STM8的ADC功能较弱，没有DMA，对多通道AD采集支持不友好。

## 1. 扫描模式

STM8的扫描模式很简陋，只能从AIN0 到 AINn，假如你需要扫描AIN2和AIN6，那么STM8只能做到从AIN0扫描到AIN6：AIN0 -> AIN1 -> AIN2 -> AIN3 -> AIN4 -> AIN5 -> AIN6（不像STM32可以设置扫描顺序，这样就能指定扫描的通道了） 。


## 2. 多通道ADC

STM8的ADC没有DMA（STM8提供了一个数据Buffer），并且其数据寄存器是8位的，ADC是10 bit的，所以需要两个寄存器来存储ADC转换结果。

STM8提供了一个数据Buffer，用来存储多通道ADC采样的转换结果，但是这个Buffer也是8位的，所以从ADC的数据寄存器到Buffer需要Copy两次，并且STM8不保证该数据Copy的原子性。

所以直接读取buffer（ADC1_GetBufferValue()）的话是不安全的，容易发生字节错位。

安全的做法是 **单次扫描**：

```c

/* Signal Scan */
void adc_init()
{
  /* Input floating, no external interrupt */
  GPIOD->DDR &= (uint8_t)(~(GPIO_PIN_2));
  GPIOD->CR1 &= (uint8_t)(~(GPIO_PIN_2));
  GPIOD->CR2 &= (uint8_t)(~(GPIO_PIN_2));
  
  GPIOC->DDR &= (uint8_t)(~(GPIO_PIN_4));
  GPIOC->CR1 &= (uint8_t)(~(GPIO_PIN_4));
  GPIOC->CR2 &= (uint8_t)(~(GPIO_PIN_4));
  
  /* Clear the align bit */
  ADC1->CR2 &= (uint8_t)(~ADC1_CR2_ALIGN);
  /* Configure the data alignment */
  ADC1->CR2 |= (uint8_t)(ADC1_ALIGN_RIGHT);

  /* Clear the ADC1 channels */
  ADC1->CSR &= (uint8_t)(~ADC1_CSR_CH);
  /* Select the ADC1 channel */
  ADC1->CSR |= (uint8_t)(ADC1_CHANNEL_3); // from AIN0 ~ AIN3
  
  /* Clear the SPSEL bits */
  ADC1->CR1 &= (uint8_t)(~ADC1_CR1_SPSEL);
  /* Select the prescaler division factor according to ADC1_PrescalerSelection values */
  ADC1->CR1 |= (uint8_t)(ADC1_PRESSEL_FCPU_D2);
  
  // DISABLE
  ADC1->TDRL |= (uint8_t)((uint8_t)0x01 << (uint8_t)ADC1_SCHMITTTRIG_CHANNEL2);
  ADC1->TDRL |= (uint8_t)((uint8_t)0x01 << (uint8_t)ADC1_SCHMITTTRIG_CHANNEL3);
  
   /* Enable the ADC1 peripheral */
  ADC1->CR1 |= ADC1_CR1_ADON;
  
  /* Enables the ADC1 scan mode */
  ADC1->CR2 |= ADC1_CR2_SCAN;
  
  /* Enables the ADC1 data store into the Data Buffer registers rather than in the Data Register */
  ADC1->CR3 |= ADC1_CR3_DBUF;
}

uint16_t get_adc_value()
{
    /* Start ADC1 conversion */
    ADC1->CR1 |= ADC1_CR1_ADON;
    
    /* Wait for conversion finish */
    while((ADC1->CSR & ADC1_FLAG_EOC)==0);
    /* clear the flag */
    ADC1->CSR &= (uint8_t)~(ADC1_FLAG_EOC);

    // read current ADC1_CH3
    raw_current_adc = (uint16_t)(*((uint8_t*)0x53E7) | (uint16_t)(*((uint8_t*)0x53E6) << (uint8_t)8));
    
    // read position ADC1_CH2
    return (uint16_t)(*((uint8_t*)0x53E5) | (uint16_t)(*((uint8_t*)0x53E4) << (uint8_t)8));
}
```

