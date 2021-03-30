# 互斥体


> The word MUTEX originates from 'MUTual EXclusion'.

MUTEX是'MUTual EXclusion'的缩写。


> Even though mutexes and binary semaphores share many characteristics, the scenario shown in Figure 63 (where a mutex is used for mutual exclusion) is completely different to that shown in Figure 53 (where a binary semaphore is used for synchronization). The primary difference is what happens to the semaphore after it has been obtained: 
> * A semaphore that is used for mutual exclusion must always be returned.
> * A semaphore that is used for synchronization is normally discarded and not returned.

mutexes与binary semaphores最大的区别在于：
* 用于互斥访问的mutexes信号量必须被返回
* 用于同步的信号量通常会被丢弃不返回

参考《Mastering_the_FreeRTOS_Real_Time_Kernel-A_Hands-On_Tutorial_Guide》中的图53和图63就明白了。


> Examples of such features include semaphores and queues, both of 
which have the following properties: 
> * They allow a task to wait in the Blocked state for a single event to occur. 
> * They unblock a single task when the event occurs—the task that is unblocked is the highest priority task that was waiting for the event.

Event groups are another feature of FreeRTOS that allow events to be communicated to 
tasks. Unlike queues and semaphores:
* Event groups allow a task to wait in the Blocked state for a combination of one of more events to occur.
* Event groups unblock all the tasks that were waiting for the same event, or combination of events, when the event occurs.


> ### Communicating Through Intermediary Objects
> This book has already described various ways in which tasks can communicate with each other. The methods described so far have required the creation of a communication object. 
> Examples of communication objects include queues, event groups, and various different types of semaphore.