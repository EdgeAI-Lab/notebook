# matplotlib基础

## 1.画图基础

```python
import matplotlib.pyplot as plt
import numpy as np

x=np.linspace(-100,100,200)
y=2*x

plt.plot(x,y)
plt.show()
```

## 2.为图标添加注释

```python
import matplotlib.pyplot as plt
import numpy as np
import math

angle = 0.05
distance = 100

k = (math.atan(math.radians(angle)))
x = np.linspace(0, distance, 10000)
y = k*x

plt.figure(num=1, figsize=(8, 5),)
plt.plot(x, y)

ax = plt.gca()
ax.spines['right'].set_color('none')
ax.spines['top'].set_color('none')
ax.spines['top'].set_color('none')
ax.xaxis.set_ticks_position('bottom')
ax.spines['bottom'].set_position(('data', 0))
ax.yaxis.set_ticks_position('left')
ax.spines['left'].set_position(('data', 0))

x0 = 100
y0 = k*x0
# 画出一条垂直于x轴的虚线.
plt.plot([x0, x0,], [0, y0,], 'k--', linewidth=2.5)
# set dot styles
plt.scatter([x0, ], [y0, ], s=50, color='b')

# 添加注释 annotate, (x0, y0)这个点进行标注.
#参数xycoords='data' 是说基于数据的值来选位置,
# xytext=(+30, -30) 和 textcoords='offset points' 对于标注位置的描述 和 xy 偏差值,
# arrowprops是对图中箭头类型的一些设置.
y0_ = y0*distance
plt.annotate(r'$%.4fcm$' % y0_, xy=(x0, y0), xycoords='data', xytext=(-30, +30),
             textcoords='offset points', fontsize=16,
             arrowprops=dict(arrowstyle='->', connectionstyle="arc3,rad=.2"))


plt.annotate(r'$%.2f°$' % angle, xy=(0, 0), xycoords='data', xytext=(+30, +5),
             textcoords='offset points', fontsize=16,
             arrowprops=dict(arrowstyle='->', connectionstyle="arc3,rad=.2"))

# 添加注释 text
# 其中-3.7, 3,是选取text的位置
plt.text(3, 0.05, 'ok',
         fontdict={'size': 16, 'color': 'r'})
plt.show()
```