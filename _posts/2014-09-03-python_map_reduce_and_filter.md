---
layout: post
title: Python map/reduce/filter小结
date: 2014-09-03 23:22:52
category: 
tags: python map reduce filter
---

python内置了三个非常棒的函数，map、reduce和filter，均用于处理list、tuple和str等可以使用迭代器的数据类型。


## map函数

map可以根据提供的函数function，顺序处理参数中的sequence。map定义如下：
> map(function, sequence\[, sequence, ...\]) -> list
    
> Return a list of the results of applying the function to the items of the argument sequence(s).  If more than one sequence is given, the function is called with an argument list consisting of the corresponding item of each sequence, substituting None for missing values when not all sequences have the same length.  If the function is None, return a list of the items of the sequence (or a list of tuples if more than one sequence).

* 数字list转字符串list的例子：
{% highlight python %}
l = [1, 3, 5, 7, 9]
map(str, l)


['1', '3', '5', '7', '9']
{% endhighlight %}

* 输入多个list：
{% highlight python %}
l = ['a', 'b']
m = [1, 3, 5, 7, 9]
n = [0, 2, 4, 6, 8]
def join_str(x, y):
	return '%s%s' % (x, y)
map(join_str, l, m)
map(join_str, m, n)

['a1', 'b3', 'None5', 'None6', 'None9']
['10', '32', '54', '76', '98']
{% endhighlight %}

* 输入函数为None的例子：
{% highlight python %}
l = [1, 3, 5, 7, 9]
m = [0, 2, 4, 6, 8]
map(None, l)
map(None, l, m)


[1, 5, 9, 13, 17]
[(1, 0), (3, 2), (5, 4), (7, 6), (9, 8)]
{% endhighlight %}

## reduce函数

reduce可以根据提供的函数function，顺序处理参数中的sequence，与map不同的是function每次的输入为上次的结果和下一个元素。默认开始时处理第一个和第二个元素，如果在提供了initial的情况下，开始处理initial和第一个元素。reduce要求function必须接受2个参数，而且reduce不允许输入sequence为空，否则会抛出TypeError异常。reduce定义如下：
> reduce(function, sequence[, initial]) -> value
> 
> Apply a function of two arguments cumulatively to the items of a sequence, from left to right, so as to reduce the sequence to a single value. For example, ((((1+2)+3)+4)+5).  If initial is present, it is placed before the items of the sequence in the calculation, and serves as a default when the sequence is empty.

* 数组求和的例子
{% highlight python %}
l = [1, 3, 5, 7, 9]
def add(x, y):
	return x + y
reduce(add, l)
reduce(add, l, 100)

25
125
{% endhighlight %}

## filter函数

filter可以根据提供的函数function，顺序处理参数中的sequence，并返回function返回True的sequence。让输入sequence为tuple或string时，返回的数据类型仍然为tuple或string。filter定义如下：

> filter(function or None, sequence) -> list, tuple, or string
    
> Return those items of sequence for which function(item) is true.  If function is None, return the items that are true.  If sequence is a tuple or string, return the same type, else return a list.

* 求奇数的例子
{% highlight python %}
l = [1, 2, 3, 4, 5]
filter(lambda x: x % 2, l)

[1, 3, 5]
{% endhighlight %}

## 参考资料

- Python文档：[Build-in Functions](https://docs.python.org/2.7/library/functions.html)