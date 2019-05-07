# Cross-compile OpenCV for android use CMake

## 1.Get Android Standalone Toolchains




## 2.Get Android SDK




## 3.Install Nanja and Ant



## 4.Compile
cmake \
-DCMAKE_TOOLCHAIN_FILE=../platforms/android/android.toolchain.cmake \
-DANDROID_STL=gnustl_shared \
-DANDROID_NATIVE_API_LEVEL=23 ..