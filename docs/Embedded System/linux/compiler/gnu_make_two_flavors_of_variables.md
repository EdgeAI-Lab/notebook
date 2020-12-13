# GNU make中的2种变量

<a href="https://www.gnu.org/software/make/manual/make.html#Flavors" target="_blank">官网的介绍</a>

## 1. recursively expanded variable（使用时展开）

```make
=
```

example: 

```make
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:
	echo $(foo)
```
执行结果：
```
$ make all

echo Huh?
Huh?
```


## 2. Simply expanded variables（定义时展开）

Variables defined with := in GNU make are expanded when they are defined rather than when they are used.

```
:=
```

```make
x := foo
y := $(x) bar
x := later
```

is equivalent to

```make
y := foo bar
x := later
```

# 3. conditional variable（条件变量，假如未定义才定义）

There is another assignment operator for variables, ‘?=’. This is called a conditional variable assignment operator, because it only has an effect if the variable is not yet defined. This statement:

```make
FOO ?= bar
```

is exactly equivalent to this (see The origin Function):

```make
ifeq ($(origin FOO), undefined)
  FOO = bar
endif
```

Note that a variable set to an empty value is still defined, so ‘?=’ will not set that variable.