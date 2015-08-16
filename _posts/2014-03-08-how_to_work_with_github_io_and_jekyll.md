---
layout: post
title: "使用GitHub Pages和Jekyll建网站"
date:   2014-03-08 00:25:09
categories: GitHub
tags: GitHub Jekyll Markdown
---

[GitHub Pages](http://pages.github.com)
是GitHub提供的免费公共站点服务。以下是GitHub的官方简介：

> #### Websites for you and your projects.  
> Hosted directly from your GitHub repository. Just edit, push, and your changes are live.  

使用GitHub Pages可以很轻松地为个人、组织或者GitHub项目建一个静态站点。  
只要注册好GitHub账号，就会自动有与用户名相对应的username.github.io主页了。只不过默认是404错误页面而已。只需要创建一个代码仓库（repo），即可将自己的页面放到GitHub上。  
当然啦，你还可以[自定义域名](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)。  
使用Jekyll在GitHub上建网站的基本思路是：使用Markdown语言写网页内容，并上传到GitHub的代码仓库中，GitHub使用Jekyll将Markdown问津啊转换为html，这样网站就可以访问了。

###1. 环境搭建
既然网站保存在GitHub上，安装git当然是必要的了。这里我们使用markdown来写网站正文，因此顺便也安装ruby和Jekyll。如果想自己写html，也可以忽略这两个。  

- 安装git，各种[版本](https://help.github.com/articles/set-up-git)的都木有问题。   
- 安装[ruby](https://www.ruby-lang.org)  
- 安装[Jekyll](http://jekyllrb.com/docs/installation/)  
如果已经装好ruby gem，直接执行`gem install jekyll`  
- 创建你自己的代码仓库（注意分支）

| URL | 代码仓库 | 分支 |
| --- | --- | --- |
| username.github.io | username.github.io | master |
| username.github.io/project | project | gh-pages |

###2. 使用Jekyll和Markdown
- Jekyll基本用法  
将创建好的代码仓库clone到本地。
使用Jekyll创建一个新的项目：   
`jekyll new repo`   

- Jekyll[目录结构](http://jekyllrb.com/docs/structure/)  
\_posts文件夹下是网页文件，\_layouts文件夹下是网页模板，可以自行修改，\_sites文件夹下是Jekyll生成好的网页html文件，css文件夹下的样式文件可以自行修改，网上也提供了很多模板下载。   

- Jekyll提供了一个简单的本地服务器，供测试时使用：  
`jekyll serve`  
加上-w参数打开调试模式，修改文件时不需要重新自动Jekyll服务器：  
`jekyll serve -w`  
Jekyll默认的服务器地址是：`0.0.0.0:4000`，通过浏览器即可看到Jekyll为你创建的新项目了。  

- Jekyll自定义  
Jekyll支持在网页文件头部增加一些[自定义信息](http://jekyllrb.com/docs/frontmatter/)，如模板、标题、时间、分类、tag等等。
Jekyll同时也提供了一些[变量](http://jekyllrb.com/docs/variables/)供模板使用。  
Jekyll[配置文件](http://jekyllrb.com/docs/configuration/)是\_config.yml。
Jekyll使用redcarpet作为Markdown解析器默认不支持Markdown语法的表格，可以修改\_config.yml，增加如下配置来支持：  
` redcarpet:
    extensions: ["tables"]  
`

- 关于Markdown  
Markdown是一种纯文本的语言，提供了一些基本的文本格式化的语法，参考[这里](http://www.markdown.cn)。  
Markdown语言通过解析器转换为html，Markdown解析器有很多，Jekyll也支持更换其他解析器。  
对于程序员来说，Markdown原生支持代码语法高亮：  
{% highlight python %}
print "Hello world"
{% endhighlight %}

###3. 提交代码
站点测试好以后，就可以提交到GitHub上了。只需稍等片刻，即可在github.io上访问到刚才上传的页面了。  
*注意：使用Jekyll需要在.gitignore文件中加入_site，避免将本地的站点文件上传到了GitHub上。*  

###4. 小结
在GitHub Pages上建网站虽然看起来是个挺繁琐的过程，但其实一旦把前期的准备搞定了，后面的工作就很轻松了。

###参考资料
- [GitHub Pages帮助](https://help.github.com/categories/20/articles)
- [Jekyll快速入门](http://jekyllrb.com/docs/quickstart/)
- [Markdown主页](http://daringfireball.net/projects/markdown/)
- Mac版Markdown编辑工具：[Mou](http://mouapp.com)

