---
layout: post
title: Python中with和contextlib使用小结
date: 2014-03-09 18:17:40
category: python
tags: python with contextlib
---

python在2.5中引入了with statement，简单地说，with封装了\_\_enter\_\_和\_\_exit\_\_函数的调用，可以用来简化try...except...finally的使用，with官方定义如下：  

> The with statement is used to wrap the execution of a block with methods defined by a context manager.  

with定义中提到的context manager，定义如下：  

> A context manager is an object that defines the runtime context to be established when executing a with statement.  

context manager定义了\_\_enter\_\_和\_\_exit\_\_函数，供with使用。contextmanager是python的一种[内置类型](http://docs.python.org/2/library/stdtypes.html#typecontextmanager)，不过context manager也可以理解为为一种协议，只要函数包含了这两个函数即可。因此既可以通过contextlib.contextmanager来生成这两个函数，也可以直接写好。  
一个简单读取文件的例子：  
{% highlight python %}
with open('filename', 'r') as f:
	print f.readline()
{% endhighlight %}  

打开的文件会在with语句块结束的时候自动关闭。这段代码等价于：  
{% highlight python %}
try:
	f = open('filename', 'r')
	print f.readline()
finally:
	f.close()
{% endhighlight %}

## with的基本语法和执行过程

with的基本语法：  
{% highlight python %}
with with_item as target_item:
	do_something
{% endhighlight %}

这里as target\_item的部分是可选的，target\_item可以看做with\_item执行的返回值  

with的简化执行过程：  
1. 执行with\_item的\_\_enter\_\_()  
2. 执行代码块do\_something  
3. 执行with\_item的\_\_exit\_\_()  

这里忽略了一个很重要的细节，with代码块do\_something过程中如果出错，并不保证\_\_exit\_\_函数被执行：  
如果do\_something抛出异常，那么异常的type, value, traceback会作为参数传给\_\_exit\_\_函数，正常退出时这三个参数值为None；  
如果do\_something因为其他任何原因出错，则忽略\_\_exit\_\_函数。  

另外需要注意的一点是，代码抛出异常时，\_\_exit\_\_函数如果已经处理了异常，则可以返回True值；如果需要外部代码来处理该异常，则\_\_exit\_\_函数不需要做任何工作。
  
## context manager

一个使用context manager的例子：
{% highlight python %}
class tag:
	# tag类符合context manager类型的定义
	def __init__(self, name):
		self.name = name
	def __enter__(self):
		print "<%s>" % self.name
		# 这里的返回值最为as的值
		return self.name
	def __exit__(self, exc_type, exc_value, exc_traceback):
		print "</%s>" % self.name
		# 如果希望在这里处理异常，并清除异常状态，在这里增加返回值，且返回值为真
		# return True

with tag("h1") as t:
	print t + ".foo"
{% endhighlight %}

执行结果如下：

	<h1>  
	h1.foo
	</h1>  
这段代码等价于下文3.1.中使用contextlib.contextmanager的代码。

## contextlib

在with定义里提到的context manager在contextlib中，contextlib为with一共提供了一个装饰器和两个函数：  

    contextlib.contextmanager  
    contextlib.nested  
    contextlib.closing  

### contextlib.contextmanager

一个装饰器，利用生成器为函数提供\_\_enter\_\_和\_\_exit\_\_函数。例如：
{% highlight python %}
from contextlib import contextmanager
@contextmanager
def tag(name):
	print "<%s>" % name
	yield name
	print "</%s>" % name

with tag("h1") as t:
	print t + ".foo"
{% endhighlight %}


简单地说，yield前的部分作为\_\_enter\_\_，yield后的部分作为\_\_exit\_\_。yield只能有一个值，作为as语句中target\_item的值。  
使用contextmanager装饰器，在上面的例子中，如果出现出现异常，\_\_exit\_\_并未做任何处理。一个处理异常的例子:  
{% highlight python %}
from contextlib import context manager
def tag(name):
	try:
		print "<%s>" % name
		yield name
	except Exception, e:
		print e
	finally:
		print "</%s>" % name

with tag("h1") as t:
	print t + 1
{% endhighlight %}
执行结果如下：

	<h1>
	cannot concatenate 'str' and 'int' objects
	</h1>

### contextlib.nested

用来合并多个context manager，从而避免嵌套多层with语句。但其实从2.7版本以后，with语法已经原生支持使用多个context manager。因此嵌套with有以下三个版本：  

- 最原始的版本：
{% highlight python %}
with A() as a:
	with B() as b:
		do_something()
{% endhighlight %}
- nested版本：
{% highlight python %}
from contextlib import nested
with nested(A(), B()) as (a, b):
	do_something()
{% endhighlight %}
- 最简单的版本（推荐）：
{% highlight python %}
with A() as a, B() as b:
	do_something()
{% endhighlight %}

### contextlib.closing

在退出时调用close函数，最常见的例子：
{% highlight python %}
from contextlib import closing
import urllib

with closing(urllib.urlopen('http://www.sogou.com')) as page:
	for line in page
		print line
{% endhighlight %}

## 小结

- with语句可以封装try...except...finally代码，让代码更简洁，更容易复用。  
- contextmanager定义了with语句执行时的上下文。  
- 要注意异常的处理方式。


## 参考资料

- Python文档：[The with statement](http://docs.python.org/2/reference/compound_stmts.html#with)
- Python文档：[With statement Context Managers](http://docs.python.org/2/reference/datamodel.html#context-managers)
- Python文档：[contextlib — Utilities for with-statement contexts](http://docs.python.org/2/library/contextlib.html)
- [PEP 343 -- The "with" Statement](http://legacy.python.org/dev/peps/pep-0343/)