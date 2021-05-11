# Python多线程

```python
import threading

def thread_a():
    while True:
        print("it is thread a")

def thread_b():
    while True:
        print("it is thread b")


threads = []

t1 = threading.Thread(target=thread_a)
threads.append(t1)
t2 = threading.Thread(target=thread_b)
threads.append(t2)
if __name__=='__main__':
    for t in threads:
        t.start()
    for t in threads:
        t.join()
print ("quit")
```