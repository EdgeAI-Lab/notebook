# Tensorflow

## 1.模型保存

### 模型有3中保存格式

* SavedModel directories
* tf.keras models
* concrete functions（还没搞懂）

### SavedModel directories

```
# 将模型保存到./saved文件夹下
tf.saved_model.save(model,'saved')
```

### tf.keras models

```
# 将模型保存为./model.h5文件
model.save('model.h5')
```

## 2.模型转换

### SavedModel directories

```
# 注意：必须使用TensorFlow2.0
converter = tf.lite.TFLiteConverter.from_saved_model('saved')
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_quant_model = converter.convert()
open("sine_savedmodel_quantized.tflite", "wb").write(tflite_quant_model)
```

### tf.keras models

