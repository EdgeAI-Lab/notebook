# MaixPy Snippet

以下代码适用的硬件平台是K210 KD233

## 1. MaixPy SD Card


* 修改SD Card的引脚配置

```c
// sdcard.c
uint8_t sd_init(void)
{
	uint8_t frame[10], index, result;
	cardinfo.active = 0;
	#ifdef CONFIG_BOARD_M5STICK
		fpioa_set_function(30, FUNC_SPI1_SCLK);
		fpioa_set_function(33, FUNC_SPI1_D0);
		fpioa_set_function(31, FUNC_SPI1_D1);
		fpioa_set_function(32, FUNC_GPIOHS0 + SD_CS_PIN);
		// fpioa_set_function(25, FUNC_SPI0_SS0 + SD_SS);
	#else
        // for KD233
		fpioa_set_function(29, FUNC_SPI0_SCLK);
	    fpioa_set_function(30, FUNC_SPI0_D0);
	    fpioa_set_function(31, FUNC_SPI0_D1);
		fpioa_set_function(32, FUNC_GPIOHS7);

        fpioa_set_function(24, FUNC_SPI0_SS3);
}
```

```c
// sdcard.h
// for KD233
#define SD_CS_PIN 7
```

修改以上源码之后，重新编译固件并烧写

* 测试脚本

```python
import os

print("-------------------------------")
os.chdir("/sd")
print(os.getcwd())
print(os.listdir("/sd"))
print("-------------------------------")
```

|Command	|Description	|Example|
|-----------|---------------|-------|
|os.chdir()	|changes the current directory|	os.chdir("/flash")
|os.listdir()|	list the files in the current directory|	os.listdir()
|os.listdir(path)|	list the files in another directory|	os.listdir("/sd")
|os.getcwd()|	return the current working directory|	os.getcwd()
|os.rename(old_path, new_path)|	rename a file|	os.rename("./blue.py", "./aaah.py")
|os.remove(path)|	remove a file|	os.remove("./herring.py")

[reference link](https://maixpy.sipeed.com/en/get_started/edit_file.html)


## 2. MaixPy录音

```python
from Maix import GPIO, I2S, FFT
import image
import lcd
import math
import time
import gc
from board import board_info
from fpioa_manager import fm
import audio

sample_rate = 22050
sample_points = 4096

fm.register(36, fm.fpioa.I2S0_IN_D0, force=True)
# 19 on Go Board and Bit(new version)
fm.register(37, fm.fpioa.I2S0_WS, force=True)
# 18 on Go Board and Bit(new version)
fm.register(38, fm.fpioa.I2S0_SCLK, force=True)

rx = I2S(I2S.DEVICE_0)
rx.channel_config(rx.CHANNEL_0, rx.RECEIVER, align_mode=I2S.STANDARD_MODE)
rx.set_sample_rate(sample_rate)
print(rx)

import time

# init audio
player = audio.Audio(path="/sd/record_1.wav", is_create=True, samplerate=22050)

queue = []

for i in range(400):
    tmp = rx.record(sample_points)
    if len(queue) > 0:
        ret = player.record(queue[0])
        queue.pop(0)
    rx.wait_record()
    queue.append(tmp)
    print(time.ticks())

player.finish()
```

## 3. MIC Array 


将这段代码放到 MaixPy/components/micropython/port/src/maixpy_main.c 文件中，然后重新编译并烧写固件，K210上电即可使用麦克风阵列



```c
/****** fhc ************/
#include "lib_mic.h"
#include "sipeed_sk9822.h"

#define PLL2_OUTPUT_FREQ 45158400UL

uint16_t my_colormap_parula[64] = {
    0x3935, 0x4156, 0x4178, 0x4199, 0x41ba, 0x41db, 0x421c, 0x423d,
    0x4a7e, 0x429e, 0x42df, 0x42ff, 0x431f, 0x435f, 0x3b7f, 0x3bbf,
    0x33ff, 0x2c1f, 0x2c3e, 0x2c7e, 0x2c9d, 0x24bd, 0x24dd, 0x251c,
    0x1d3c, 0x1d5c, 0x1d7b, 0x159a, 0x05ba, 0x05d9, 0x05d8, 0x0df7,
    0x1e16, 0x2615, 0x2e34, 0x3634, 0x3652, 0x3e51, 0x4e70, 0x566f,
    0x666d, 0x766c, 0x866b, 0x8e49, 0x9e48, 0xae27, 0xbe26, 0xc605,
    0xd5e4, 0xdde5, 0xe5c5, 0xf5c6, 0xfdc7, 0xfde7, 0xfe27, 0xfe46,
    0xfe86, 0xfea5, 0xf6e5, 0xf704, 0xf744, 0xf764, 0xffa3, 0xffc2};

uint16_t my_colormap_parula_rect[64][14 * 14] __attribute__((aligned(128)));

int init_my_colormap_parula_rect()
{
    for (uint32_t i = 0; i < 64; i++)
    {
        for (uint32_t j = 0; j < 14 * 14; j++)
        {
            my_colormap_parula_rect[i][j] = my_colormap_parula[i];
        }
    }
    return 0;
}
uint8_t my_lib_init_flag = 0;

volatile uint8_t my_mic_done = 0;
uint8_t my_thermal_map_data[256];

void lib_mic_cb(void)
{
    my_mic_done = 1;
}

void my_mic_array_init(void)
{
    // sysctl_pll_set_freq(SYSCTL_PLL2, PLL2_OUTPUT_FREQ); //如果使用i2s,必须设置PLL2

    //evil code
    fpioa_set_function(23, FUNC_I2S0_IN_D0);
    fpioa_set_function(22, FUNC_I2S0_IN_D1);
    fpioa_set_function(21, FUNC_I2S0_IN_D2);
    fpioa_set_function(20, FUNC_I2S0_IN_D3);
    fpioa_set_function(19, FUNC_I2S0_WS);
    fpioa_set_function(18, FUNC_I2S0_SCLK);
//TODO: optimize Soft SPI
    fpioa_set_function(24, FUNC_GPIOHS0 + SK9822_DAT_GPIONUM);
    fpioa_set_function(25, FUNC_GPIOHS0 + SK9822_CLK_GPIONUM);

    // init_my_colormap_parula_rect();
    sipeed_init_mic_array_led();

    int ret = lib_mic_init(DMAC_CHANNEL4, lib_mic_cb, my_thermal_map_data);
    if(ret != 0)
    {
        return;
    }
    my_lib_init_flag = 1;
}



void Maix_mic_array_deinit(void)
{
    if(my_lib_init_flag)
    {
        lib_mic_deinit();
        my_lib_init_flag = 0;
    }
}

void my_mic_array_get_map(uint8_t *data)
{
    my_mic_done = 0;

    volatile uint8_t retry = 100;

    while(my_mic_done == 0)
    {
        retry--;
        msleep(1);
    }

    if(my_mic_done == 0 && retry == 0)
    {
        // xfree(data);
        return ;
    }

    memcpy(data, my_thermal_map_data, 256);
}

uint8_t my_voice_strength_len[12] = {14, 20, 14, 14, 20, 14, 14, 20, 14, 14, 20, 14};

//voice strength, to calc direction
uint8_t my_voice_strength[12][32] = {
    {197, 198, 199, 213, 214, 215, 228, 229, 230, 231, 244, 245, 246, 247},                               //14
    {178, 179, 192, 193, 194, 195, 196, 208, 209, 210, 211, 212, 224, 225, 226, 227, 240, 241, 242, 243}, //20
    {128, 129, 130, 131, 144, 145, 146, 147, 160, 161, 162, 163, 176, 177},
    {64, 65, 80, 81, 82, 83, 96, 97, 98, 99, 112, 113, 114, 115},
    {0, 1, 2, 3, 16, 17, 18, 19, 32, 33, 34, 35, 36, 48, 49, 50, 51, 52, 66, 67},
    {4, 5, 6, 7, 20, 21, 22, 23, 37, 38, 39, 53, 54, 55},
    {8, 9, 10, 11, 24, 25, 26, 27, 40, 41, 42, 56, 57, 58},
    {12, 13, 14, 15, 28, 29, 30, 31, 43, 44, 45, 46, 47, 59, 60, 61, 62, 63, 76, 77},
    {78, 79, 92, 93, 94, 95, 108, 109, 110, 111, 124, 125, 126, 127},
    {140, 141, 142, 143, 156, 157, 158, 159, 173, 172, 174, 175, 190, 191},
    {188, 189, 203, 204, 205, 206, 207, 219, 220, 221, 222, 223, 236, 237, 238, 239, 252, 253, 254, 255},
    {200, 201, 202, 216, 217, 218, 232, 233, 234, 235, 248, 249, 250, 251},
};

void calc_my_voice_strength(uint8_t *voice_data, uint8_t *led_brightness)
{
    uint32_t tmp_sum[12] = {0};
    uint8_t i, index, tmp;

    for (index = 0; index < 12; index++)
    {
        tmp_sum[index] = 0;
        for (i = 0; i < my_voice_strength_len[index]; i++)
        {
            tmp_sum[index] += voice_data[my_voice_strength[index][i]];
        }
        tmp = (uint8_t)tmp_sum[index] / my_voice_strength_len[index];
        led_brightness[index] = tmp > 15 ? 15 : tmp;
    }
}

void my_mic_array_get_dir(uint8_t *data)
{
	uint8_t index, brightness[12] = {0}, led_color[12] = {0}, color[3] = {255,0,0};

    calc_my_voice_strength(data, brightness);
	
	//rgb 
    uint32_t set_color = (color[2] << 16) | (color[1] << 8) | (color[0]);
	
	for (index = 0; index < 12; index++)
    {
        led_color[index] = (brightness[index] / 2) > 1 ? (((0xe0 | (brightness[index] * 2)) << 24) | set_color) : 0xe0000000;
    }

//FIXME close irq?
sysctl_disable_irq();
    sk9822_start_frame();
    for (index = 0; index < 12; index++)
    {
        sk9822_send_data(led_color[index]);
    }
    sk9822_stop_frame();

sysctl_enable_irq();
}

void test_task(void* arg)
{
	uint8_t *data = xalloc(256);

	my_mic_array_init();

	printk("mic array init ...\r\n");

	while(1)
	{
		my_mic_array_get_map(data);
		my_mic_array_get_dir(data);
		msleep(1);
	}
}
/****** fhc ************/
```