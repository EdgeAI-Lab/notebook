# matplotlib子图

```python
import matplotlib.pyplot as plt
import numpy as np

# 这是第一条曲线X轴和Y轴的数据
x1=np.linspace(0,200,200)
y1=x1**2
# 设置第一条曲线的位置
# （1,2,1）前面的1,2表示这是一个1行2列的图，最后一个1表示当前这个位于第1行第1列
plt.subplot(1,2,1)
# 设置第一条曲线
plt.plot(x1,y1)

# 这是第二条曲线X轴和Y轴的数据
x2=np.linspace(0,2*np.pi,100)
# 此处使用np.sin()，因为math.sin()的参数不能是列表
y2=np.sin(x2)

# 设置第二条曲线的位置
plt.subplot(1,2,2)
# 设置第二条曲线
plt.plot(x2,y2)


# 显示图像
plt.show()
```