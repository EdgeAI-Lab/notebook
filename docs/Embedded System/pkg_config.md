# pkg-config

```bash

pkg-config --libs --cflags opus
 
-I/home/fhc/opus/local_build/include/opus -L/home/fhc/opus/local_build/lib -lopus

gcc trivial_example.c `pkg-config`

```