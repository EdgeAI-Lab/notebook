# AAC基础知识
* [参考链接1](https://stackoverflow.com/questions/18784781/how-to-initialize-mediaformat-to-configure-a-mediacodec-to-decode-raw-aac-data)

* [参考链接2](https://wiki.multimedia.cx/index.php?title=ADTS)

* [参考链接3](https://stackoverflow.com/questions/48164609/when-i-encode-pcm-to-an-aac-file-the-file-is-not-correctly-analyzed-with-aac-ana)

* [参考链接4](https://wiki.multimedia.cx/index.php?title=MPEG-4_Audio)


对于AAC来说，"csd-0"对应ADTS

```
5 bits: object type
if (object type == 31)
    6 bits + 32: object type
4 bits: frequency index
if (frequency index == 15)
    24 bits: frequency
4 bits: channel configuration
var bits: AOT Specific Config
````


## Audio Object Types

MPEG-4 Audio Object Types:

0: Null  
1: AAC Main  
2: AAC LC (Low Complexity)  
3: AAC SSR (Scalable Sample Rate)  
4: AAC LTP (Long Term Prediction)  
5: SBR (Spectral Band Replication)  
6: AAC Scalable  
7: TwinVQ  
8: CELP (Code Excited Linear Prediction)  
9: HXVC (Harmonic Vector eXcitation Coding)  
10: Reserved  
11: Reserved  
12: TTSI (Text-To-Speech Interface)  
13: Main Synthesis  
14: Wavetable Synthesis  
15: General MIDI  
16: Algorithmic Synthesis and Audio Effects  
17: ER (Error Resilient) AAC LC  
18: Reserved  
19: ER AAC LTP  
20: ER AAC Scalable  
21: ER TwinVQ  
22: ER BSAC (Bit-Sliced Arithmetic Coding)  
23: ER AAC LD (Low Delay)  
24: ER CELP  
25: ER HVXC  
26: ER HILN (Harmonic and Individual Lines plus Noise)  
27: ER Parametric  
28: SSC (SinuSoidal Coding)  
29: PS (Parametric Stereo)  
30: MPEG Surround  
31: (Escape value)  
32: Layer-1  
33: Layer-2  
34: Layer-3  
35: DST (Direct Stream Transfer)  
36: ALS (Audio Lossless)  
37: SLS (Scalable LosslesS)  
38: SLS non-core  
39: ER AAC ELD (Enhanced Low Delay)  
40: SMR (Symbolic Music Representation) Simple  
41: SMR Main  
42: USAC (Unified Speech and Audio Coding) (no SBR)  
43: SAOC (Spatial Audio Object Coding)  
44: LD MPEG Surround  
45: USAC  


## Sampling Frequencies  
There are 13 supported frequencies:

0: 96000 Hz  
1: 88200 Hz  
2: 64000 Hz  
3: 48000 Hz  
4: 44100 Hz  
5: 32000 Hz  
6: 24000 Hz  
7: 22050 Hz  
8: 16000 Hz  
9: 12000 Hz  
10: 11025 Hz  
11: 8000 Hz  
12: 7350 Hz  
13: Reserved  
14: Reserved  
15: frequency is written explictly  

## Channel Configurations  
These are the channel configurations:  

0: Defined in AOT Specifc Config  
1: 1 channel: front-center  
2: 2 channels: front-left, front-right  
3: 3 channels: front-center, front-left, front-right  
4: 4 channels: front-center, front-left, front-right, back-center  
5: 5 channels: front-center, front-left, front-right,back-left, back-right  
6: 6 channels: front-center, front-left, front-right, back-left, back-right, LFE-channel  
7: 8 channels: front-center, front-left, front-right, side-left, side-right, back-left, back-right, LFE-channel  
8-15: Reserved  

## 计算CDS0

csd[0]高五位是profile  
csd[0]低三位 | csd[1]最高位 是采样率索引  

```c
int profile = (csd_data[0] >> 3) & 0x1F;
int frequency_idx = ((csd_data[0] & 0x7) << 1) | ((csd_data[1] >> 7) & 0x1);
int channels = (csd_data[1] >> 3) & 0xF;

```

```
int profile = 2;  //AAC LC
        int freqIdx = 11;  //8.0KHz
        int chanCfg = 1;  //CPE 声道数
        
        0001 0101
        
        1000 0001
        
        0001
        
        0001 0101 1001 0000
        0x15 0x90
        
        0001 0101 1000 1000
        0x15 0x88


int profile = 2;  //AAC LC
int freqIdx = 8;  //16.0KHz
0001 0100 0000 1000
14 08


5 bits: object type
AAC_LC   2
0 0010

4 bits: frequency index
48k 3
0011

4 bits: channel configuration
CH  2
0010

再补三位
000


48K 2ch
0001 0001 1001 0000
0x11 0x90


16K 1ch
0000 1100 0000 1000
0x0c 0x08

```