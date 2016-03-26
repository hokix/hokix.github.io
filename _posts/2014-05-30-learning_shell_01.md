---
layout: post
title: Shell学习小结（1）
date: 2014-05-30 21:59:08
category: shell
tags: shell
---
shell中有很多特殊符号，`:`不太常见，却很好用，`$`则是变化万千。
## 1. :

`:`是一个空命令。`:`什么也不干，起返回值是0，因此也可以看做与`true`作用相同。

死循环：
{% highlight sh %}
while :
do
	echo 'hi'
done
{% endhighlight %}

if/then占位符：
{% highlight sh %}
if condition
then :
else
	echo 'hi'
fi
{% endhighlight %}

用来替代`cat /dev/null > data`：
{% highlight sh %}
: > data
{% endhighlight %}

## 2. $

与`:`不同，`$`是一个很常见的符号，与其他符号组号有多种含义。

| 符号 | 含义 |
| --- | --- |
| $ | 变量替换 |
| $ | 正则行结束符 |
| $# | 参数个数 |
| $0 | shell本身文件名 |
| $1~$n | 参数n|
| $\*,$@ | 所有参数列表 |
| ${} | 参数替换 |
| $? | 上一条命令的返回值 |
| $$ | shell本身PID |
| $! | 上一条后台进程的PID |


