---
title: CCD-启动任务与合并信号
date: 2026-04-01 14:18:25
updated: 2026-04-01 14:18:25
abbrlink: tcsxip
categories:
  - /
tags:
copyright_author: JISI
copyright_author_href: https://jisicn.top
copyright_url: https://jisicn.top
copyright_info: 此文章版權歸东莞集思所有，如有轉載，請註明來自原作者
top:
top_img:
hidden: false
cover: https://tc.jisicn.top/img/20260401143209644.png
---
## Welcome to [东莞市集思光电科技有限公司 ](https://jisicn.top) ! 
<div align="center"><img src="https://tc.jisicn.top/img/202405031228351.jpeg" width="100%" height="50%"></img></div>

## 算法-36.启动任务+信号合并
功能说明：
场景: 比如CCD1需要启动两次，在不添加任何额外信号的情况，此时我们就可以新增一个任务CCD2做为第二次检测，在CCD1的ROI算法里新增算法，算法选择36.启动任务，配制好参数。
此时，当机器启动时，CCD1先被启动，CCD1启动后通过算法启动CCD2,最后，程序自动合并CCD1与CCD2的结果，都OK时输出OK信号，其中任意一个NG时输出NG信号。

配制如下：
ROI算法配制
图1
![778c05bf8d4fe04f081a3ab3f8df89f9.png](https://tc.jisicn.top/img/778c05bf8d4fe04f081a3ab3f8df89f9.png)

相机参数配制
图2
![d601423edbdd3d99e17985b195fc0cef.png](https://tc.jisicn.top/img/d601423edbdd3d99e17985b195fc0cef.png)

图3
![85af84f9a277fef5889e633a5ee66788.png](https://tc.jisicn.top/img/85af84f9a277fef5889e633a5ee66788.png)



---

<center><a href="https://www.jisicn.top" target="_blank">东莞集思光电科技有限公司</a></center>
<center><a href="https://www.jisicn.top" target="_blank">https://www.jisicn.top</a></center>
<center><a href="Https://www.dgjisi.eu.org" target="_blank">https://www.dgjisi.eu.org</a></center>

----

## 如何获取最新CCD程序
关注公众号，并发送`CCD`获取

<div align="center">
    <img src="https://tc.jisicn.top/img/202404251607047.png" width="40%" height="40%"></img>
</div>

------

<div style="text-align: center; font-size: 50px; font-weight: bold; font-style: italic;">END THANKS</div>
<div align='center'><font size='3'><b>联系人：周生  18029199900 「dgjisi@foxmail.com」</b></font></div>