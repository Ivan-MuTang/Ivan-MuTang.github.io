---
title: IO分组
date: 2024-12-13 20:54:11
updated: 2024-12-13 20:54:11
abbrlink: sofnub
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
cover: https://tc.jisicn.top/img/202412132055462.png
---
## Welcome to [东莞市集思光电科技有限公司 ](https://jisicn.top) ! 
<div align="center"><img src="https://tc.jisicn.top/img/202405031228351.jpeg" width="100%" height="50%"></img></div>

## IO分组
### 分组定义
	当一个相机中需要同时检测多个产品，并且每个产品还要求分别排不良时，才会用到IO分组

### 分组设置
在数据页面中，每个数据***归组***，比如当前CCD要测试三个产品，此时，将与第一个产品相关的所有数据归一个组，同理将所有与第二个产品相关的数据也归一个组，第三个产品也是一样。

![image.png](https://tc.jisicn.top/img/202412132107189.png)

假设，
跟第一个产品相关的所有数据归***0***组；
跟第二个产品相关的所有数据归***1***组；
跟第三个产品相关的所有数据归***2***组；

然后，在数据页面下方的***IO分组端口***设置区块中设置对应端口号，如图

![image.png](https://tc.jisicn.top/img/202412132126489.png)

此时要如何设置呢？
如果当前是设置CCD1分组，则图中箭头指向处，先调到0

![image.png](https://tc.jisicn.top/img/202412132112791.png)

![image.png](https://tc.jisicn.top/img/202412132123284.png)

如下图，分别设置同一个图像中对三个产品的IO设置，通过左侧第二个编号来切换设定三个不同组的IO参数，如图
![image.png](https://tc.jisicn.top/img/202412132132234.png)

CCD1中0组数据 ，OK端口0，NG端口1
![image.png](https://tc.jisicn.top/img/202412132129184.png)

CCD1中1组数据 ，OK端口2，NG端口3
![image.png](https://tc.jisicn.top/img/202412132130150.png)

CCD1中2组数据 ，OK端口4，NG端口5
![image.png](https://tc.jisicn.top/img/202412132131968.png)



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

<div align='center' ><font size='50'>END THANKS</font></div>
<div align='center'><font size='3'><b>联系人：周生  18029199900 「dgjisi@foxmail.com」</b></font></div>