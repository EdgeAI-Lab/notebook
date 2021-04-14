# 使用cmake构建STM32项目

* CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.10.2)

project(hello_cmake VERSION 0.1.0)

enable_language(C ASM)
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS OFF)

# 相当于GCC的 -I参数

include_directories(Core/Inc)
include_directories(Drivers/STM32F1xx_HAL_Driver/Inc)
include_directories(Drivers/STM32F1xx_HAL_Driver/Inc/Legacy)
include_directories(Drivers/CMSIS/Device/ST/STM32F1xx/Include)
include_directories(Drivers/CMSIS/Include)


set(C_SOURCES
Core/Src/main.c 
Core/Src/gpio.c 
Core/Src/tim.c 
Core/Src/usart.c 
Core/Src/stm32f1xx_it.c 
Core/Src/stm32f1xx_hal_msp.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_gpio_ex.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_tim.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_tim_ex.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_rcc.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_rcc_ex.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_gpio.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_dma.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_cortex.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_pwr.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_flash.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_flash_ex.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_exti.c 
Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_uart.c 
Core/Src/system_stm32f1xx.c
)

#aux_source_directory(Core/Src CORE_SOURCES)
#aux_source_directory(Drivers/STM32F1xx_HAL_Driver/Src HAL_SOURCES)


set(EXECUTABLE ${PROJECT_NAME}.out)

add_executable(${EXECUTABLE} ${C_SOURCES} startup_stm32f103xe.s)

target_compile_definitions(${EXECUTABLE} PRIVATE
        -DUSE_HAL_DRIVER
        -DSTM32F103xE
        )

target_compile_options(${EXECUTABLE} PRIVATE
        -mcpu=cortex-m3
        -mthumb

        -fdata-sections
        -ffunction-sections

        -Wall

        $<$<CONFIG:Debug>:-Og>
        )

target_link_options(${EXECUTABLE} PRIVATE
        -T${CMAKE_SOURCE_DIR}/STM32F103ZETx_FLASH.ld
        -mcpu=cortex-m3
        -mthumb
        -specs=nano.specs
        -lc
        -lm
        -lnosys
        -Wl,-Map=${PROJECT_NAME}.map,--cref
        -Wl,--gc-sections
        )

```

* toolchain.cmake

```cmake
### toolchain.cmake ###
# this is required
set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR arm)

set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

# specify the cross compiler
SET(CMAKE_C_COMPILER   /home/fhc/workspace/cortex_m/gcc-arm-none-eabi-10-2020-q4-major/bin/arm-none-eabi-gcc)
set(CMAKE_ASM_COMPILER ${CMAKE_C_COMPILER})
SET(CMAKE_CXX_COMPILER /home/fhc/workspace/cortex_m/gcc-arm-none-eabi-10-2020-q4-major/bin/arm-none-eabi-g++)

# where is the target environment
SET(CMAKE_FIND_ROOT_PATH  /home/fhc/workspace/cortex_m/gcc-arm-none-eabi-10-2020-q4-major)

# search for programs in the build host directories (not necessary)
SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)

# for libraries and headers in the target directories
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

```