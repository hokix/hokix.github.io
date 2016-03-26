---
layout: post
title: Google CPU Profiler 学习小结
date: 2016-03-26 11:01:51
category: linux
tags: profiler
---

最近在项目中遇到了各种性能瓶颈，如果再不做优化，后续项目就很难进行下去了。于是就找到了Google Profiler，官方文档很简单，不过gperftools用起来确实简单方便。另外文档上说gperftools是多线程友好的，但我未对比测试gperftools分析单线程和多线程程序的效果。

## 简介

gperftools全称Google Performance Tools，此项目可以分为四个部分：

1. tcmalloc
2. heap-checker
3. heap-profiler
4. cpu-profiler

这里主要总结一下cpu-profiler的用法。cpu-profiler可以对CPU时间片的使用进行分析计数，并提供了将分析结果转换为可视化文档的工具。

## 安装gperftools

gperftoolf目前托管在github上，因此可以很方便的获取到[源码](https://github.com/gperftools/gperftools/releases)，直接编译安装就好了。

## 使用cpu-profiler

简单来说，使用cpu-profiler一共只有三个步骤：

1. 编译链接
2. 运行并生成剖析结果
3. 剖析结果格式转换

下面就具体说一下每一个步骤的使用方法。

## 编译链接

安装好以后，就可以在目标程序编译的时候，根据需要链接libprofiler.so或者libprofiler.a了。

```
-L/usr/lib -lprofiler
```

或者在运行时通过设置环境变量来实现动态链接（不推荐）。

```
env LD_PRELOAD="/usr/lib/libprofiler.so" <binary>
```


## 运行并生成剖析结果

运行的方法有几种：

1. 设置环境变量+发信号
	
	```
	%env CPUPROFILE=chrome.prof CPUPROFILESIGNAL=12 /bin/chrome &
	```

	开始和结束并通过向程序发送上面定义的信号12：
	```
	killall -12 chrome
	```
2. gdb中断点+调用<code>ProfilerStart()</code>和<code>ProfilerStop()</code>
	
	具体用法可以查看参考资料[使用google-preftools剖析程序性能瓶颈](http://www.ibm.com/developerworks/cn/linux/l-cn-googleperf/)
3. 代码中调用<code>ProfilerStart()</code>和<code>ProfilerStop()</code>
	
	需要引入头文件<code>gperftools/profiler.h</code>，同时<code>ProfilerStart()</code>的参数为生成剖析结果的文件名。
	
更多高级用法，可以参考<code>gperftools/profiler.h</code>中定义的<code>ProfilerFlush()</code>和<code>ProfilerStartWithOptions()</code>。

## 剖析结果格式转换

格式转换使用gproftools里提供的<code>pprof</code>工具。同时转换成调用关系图需要用到<code>graphviz</code>库中的<code>dot</code>程序，转成pdf需要依赖<code>gv</code>或者<code>ps2pdf</code>。如果转换失败，就按照错误日志安装需要的库就行了。
常用的几种格式如下，其余可以参考<code>pprof -h</code>：

1. text

	```
	pprof --text /bin/ls ls.prof
	```
2. pdf

	```
	pprof --gv /bin/ls ls.prof > ls.pdf
	```
	
	或者
	
	```
	pprof --pdf /bin/ls ls.porf > ls.pdf
	```
	
如果是转成纯文本，转换好以后格式如下：
```
14	2.1%	17.2%	58	8.7%	std::_Rb_tree::find
```

每一列的含义分别为：

1. 函数的采样次数
2. 函数的采样百分比
3. 截止到当前所有函数的采样百分比
4. 该函数调用的所有函数的采样次数
5. 该函数调用的所有函数的采样百分比
6. 函数名


如果转成pdf或者图片，转换好以后的效果图如下(源自gperftools帮助文档)，分为结点、边、元信息：

![image](/images/pprof-test.gif)

每个结点分为四个部分：

1. 类名
2. 函数名
3. 采样次数（百分比）
4. 整体采样次数（百分比）

比如说，上图中的test\_main\_thread函数，共采样到200次，其中155次是在执行该函数，其他45次是在执行其调用的其他函数。

每条边代表调用的函数，边上的数字代表调用函数的次数。

还有其他更多高级功能，结点或边被删除的采样次数下界，只绘制部分函数的结果<code>--focus</code>和<code>--ignore</code>等。

## 参考资料

- [使用google-preftools剖析程序性能瓶颈](http://www.ibm.com/developerworks/cn/linux/l-cn-googleperf/)
- [gperftools github wiki](https://github.com/gperftools/gperftools/wiki)