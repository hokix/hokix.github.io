---
layout: post
title: Python 时间转换
date: 2015-02-26 15:48:27
category: 
tags: python date time datetime
---

python内置的时间相关模块有time、datetime、calendar等，这里总结一下。


## 相关术语

时间戳：timestamp，Unix时间戳，POSIX时间戳。从Epoch（1970-01-01 00:00:00 UTC）起经过的秒数，可以是整数或者浮点数。

UTC：Coordinated Universal Time，世界统一时间，世界标准时间，世界协调时间。全世界分为24个时区，中国的UTC时差为+8小时，记做UTC+8。

GMT：Greenwich Mean Time，格林威治标准时间。以不再作为时间标准时间，可以简单认为等同于UTC（UTC更加精准）。

DST：Daylight Saving Time，夏令时间，夏时制。在夏日将时钟拨快1小时，提提高日光的使用。中国没有使用。

CST：有多重含义

* Central Standard Time(USA) UTC-6:00
* Central Standard Time(Australia) UTC+9:30
* China Standard Time UTC+8:00
* Cuba Standard Time UTC-5:00


## time

time模块提供了一系列的时间函数。

| 函数类型 | 函数名 | 说明 |
| --- | --- | --- |
| 获取时间 | time | 浮点型时间戳 |
| 睡眠 | sleep | 参数单位为秒 |
| 时间转换 | gmtime | 时间戳转为时间类(UTC) |
| 时间转换 | localtime | 时间戳转为时间类(当前时区) |
| 时间转换 | mktime | 时间类转换为时间戳 |
| 时间转换 | ctime | 时间戳转换为时间字符串(固定格式) |
| 时间转换 | asctime | 时间类转换为时间字符串(固定格式) |
| 时间转换 | strftime | 时间类转换为时间字符串(自定义格式) |
| 时间转换 | strptime | 时间字符串转换为时间类(自定义格式) |

![image](/images/python-time.png)

其中gmtime、localtime、ctime、asctime、strftime没有给出时间参数时，默认使用当前时区时间。

时间类(struct_time)定义参考[这里](https://docs.python.org/2/library/time.html#time.struct_time)，
时间字符串自定义格式参考[这里](https://docs.python.org/2/library/time.html#time.strftime)。


## 参考资料

- Python文档：[time](https://docs.python.org/2/library/time.html)
- Python文档：[datetime](https://docs.python.org/2/library/datetime.html)
- Python文档：[calendar](https://docs.python.org/2/library/calendar.html)