---
layout: post
title: 使用itertools来写一个简单的map reduce streaming程序
date: 2015-07-17 21:28:39
category: python
tags: python mapreduce streaming itertools
---

常见的map reduce streaming入门版的python代码长这个样子:

mapper.py

{% highlight python %}
#!/usr/bin/env python
import sys
def main(separater='\t'):
	for line in sys.stdin:
		for words in line.strip().split():
			for word in words:
				print '%s\t%s' % (word, 1)

if __name__ == '__main__':
	main()
{% endhighlight %}

reducer.py

{% highlight python %}
#!/usr/bin/env python
import sys
last_key = ''
def main(separater='\t'):
	counts = 0
	for line in sys.stdin:
		word, count = line.strip().split(separater)
		if last_word == word:
			counts += int(count)
		else:
			print '%s\t%d' % (word, counts)
			count = 0
		last_word = word
	else:
		print '%s\t%d' % (word, counts)

if __name__ == '__main__':
	main()
{% endhighlight %}

咦，上面mapper.py和reducer.py怎么这么乱糟糟的... 因为streaming的reducer需要自己维护key是否变化... 真心很怂啊... 

然后我就看到了一篇文章，用itertools.groupby，operator.itemgetter很优雅地解决了这个问题，真心赞啊...

mapper.py

{% highlight python %}
#!/usr/bin/env python
import sys 
def read_input(file):
    for line in file:
        yield line.split()

def main(separator='\t'):
    data = read_input(sys.stdin)
    for words in data:
        for word in words:
            print '%s%s%d' % (word, separator, 1)

if __name__ == '__main__':
    main() 
{% endhighlight %}

reducer.py

{% highlight python %}
#!/usr/bin/env python
from itertools import groupby
from operator import itemgetter
import sys 

def read_mapper_output(file, separator='\t'):
    for line in file:
        yield line.strip().split(separator, 1)                                                                          
    
def main(separator='\t'):
    data = read_mapper_output(sys.stdin, separator=separator)
    for current_word, group in groupby(data, itemgetter(0)):
        try:
            total_count = sum(int(count) for current_word, count in group)
            print '%s%s%d' % (current_word, separator, total_count)
        except ValueError:
            pass

if __name__ == '__main__':
    main()
{% endhighlight %}

###参考资料
- [Writing an Hadoop MapReduce Program in Python](http://www.michael-noll.com/tutorials/writing-an-hadoop-mapreduce-program-in-python/)


