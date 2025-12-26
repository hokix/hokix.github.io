---
layout: post
title: 交叉编译windows版ffmpeg
date: 2022-02-27 11:31:47
categories: [linux, windows]
tags: ffmpeg
---

交叉编译windows版ffmpeg

工具：[https://github.com/rdp/ffmpeg-windows-build-helpers](https://github.com/rdp/ffmpeg-windows-build-helpers)

## 准备
- linux环境
- 阅读README中的注意事项
- 提示需要约125G磁盘空间，实际编译win32+win64编译器及win64 ffmpeg共使用约10G

## 参数
```
--compiler-flavors=win64 \
--ffmpeg-git-checkout=your-git \
--ffmpeg-git-checkout-version=your-branch \
--disable-nonfree=n \
--build-intel-qsv=y \
--build-x264-with-libav=y
```

## 问题
### freetype 编译错误
```
could not open '/mnt/d/Code/ffmpeg-windows-build-helpers/sandbox/win64/freetype-2.10.4/objs/ftexport.sym' for writing
```
参考[这里](https://github.com/rdp/ffmpeg-windows-build-helpers/issues/234)

> The 3rd solution might be passing relative paths to apinames.exe, this is controlled by 'TOP_DIR' variable. I commented line #17 of sandbox\win32\freetype-2.10.4\builds\unix\unix-def.in
```
#TOP_DIR := $(shell cd $(TOP_DIR); pwd)
```

### libvmaf install model文件提示没有权限

```
Installing subdir /mnt/d/Code/ffmpeg-windows-build-helpers/sandbox/win64/vmaf_git/libvmaf/../model to /mnt/d/Code/ffmpeg-windows-build-helpers/sandbox/cross_compilers/mingw-w64-x86_64/x86_64-w64-mingw32/share/model
Installation failed due to insufficient permissions.
Attempting to use polkit to gain elevated privileges...
Error getting authority: Error initializing authority: Could not connect: No such file or directory
FAILED: meson-install
/usr/local/bin/meson install --no-rebuild
ninja: build stopped: subcommand failed.
```
重试、sudo都不行，手动拷贝以后就成功了，可能与wsl有关，具体原因不明：
```
cp -r /mnt/d/Code/ffmpeg-windows-build-helpers/sandbox/win64/vmaf_git/libvmaf/../model/* /mnt/d/Code/ffmpeg-windows-build-helpers/sandbox/cross_compilers/mingw-w64-x86_64/x86_64-w64-mingw32/share/model/
```

### 不识别的lib
旧版本的ffmpeg不支持部分lib，需要手动去掉
```
--enable-libsvthevc
--enable-libsvtav1
```

### 编译错误的lib
编译ffmpeg时，可能处于版本原因，以下lib编译不过
```
--enable-libdav1d
```
