---
layout: post
title: shell中按行读取文件
date: 2014-04-18 23:46:16
category: shell
tags: shell readline
---

一般来说，shell中循环读取文件的脚本是这么写的：
{% highlight bash %}
for line in `cat filename`
do
	echo $line
done
{% endhighlight %}

不过这么写很多情况下是有问题的，例如当输入文件每一行有多列的时候：
{% highlight bash %}
-rw-r--r--   1 hokiX  staff  1072  3  4 00:46 LICENSE
-rw-r--r--   1 hokiX  staff    27  3  4 00:47 README.md
{% endhighlight %}

上面的做法简直是一场灾难... 
{% highlight bash %}
-rw-r--r--
1
hokiX
staff
1072
3
4
00:46
LICENSE
-rw-r--r--
1
hokiX
staff
27
3
4
00:47
README.md
{% endhighlight %}

正确的做法是使用`read`命令：
{% highlight bash %}
cat filename | while read line
do
	echo $line
done
{% endhighlight %}

当然使用**标准输入**替代上面的**管道**也是没有问题的：
{% highlight bash %}
while read line
do
	echo $line
done < filename
{% endhighlight %}

当然个人更倾向于使用管道的方法，这样输入就不用局限在使用文件了。

这里还需要注意另外一个问题，输入文件中的tab，变替换成了space：

{% highlight %}
Input:
a	b
c d
Output:
a b
c d
{% endhighlight %}

原因是shell脚本中有个变量叫IFS(Internal Field Seprator)，内域分隔符，对输入做了替换。IFS定义如下：
> The shell uses the value stored in IFS, which is the space, tab, and newline characters by default, to delimit words for the read and set commands, when parsing output from command substitution, and when performing variable substitution.

因此需要对代码稍作修改，才能得到正确的输出:

{% highlight bash %}
IFS=''
while read line
do
	echo $line
done < filename
{% endhighlight %}





