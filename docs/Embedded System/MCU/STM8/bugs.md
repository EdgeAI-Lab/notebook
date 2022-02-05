# BUGS

```
static void GPIO_Config(void)
{
    /* PD5 for PWM input */
    GPIO_Init(GPIOD, GPIO_PIN_5, GPIO_MODE_IN_FL_IT);
    
    /* It must be set before enableInterrupts() */
    EXTI_SetExtIntSensitivity(EXTI_PORT_GPIOD, EXTI_SENSITIVITY_RISE_FALL);
}
```