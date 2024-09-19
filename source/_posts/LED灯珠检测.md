---
title: LED灯珠检测
date: 2021-06-14 23:41:12
tags: [ccd,说明书，led]
copyright_author: JISI
copyright_author_href: https://jisicn.top
copyright_url: https://jisicn.top
copyright_info: 此文章版權歸东莞集思所有，如有轉載，請註明來自原作者
top_img: 
hidden: false
cover: https://tc.jisicn.top/img/202404251628970.jpg
---

参数路径：测试程序**根目录**--**Config**文件夹--**“复位信号”**（如下）

	[复位信号] 
	led排序开关 = "false"     #启动编号排序显示，“true”为开启；“false”为关闭。 
	字体大小 = "56"          #排序编号字体大小设定，默认为56
	单次测试数 = "5"    #测试数量设定，如参数为5表示当前测试5个产品。若每次只需测2个产品，则改为2。
	起始位置Y = "150"   #设定Y方向的位置
	端口号1 = "-1"      #CCD1显示复位，收到信号即表示为新的产品，起始位置。
	端口号1 = "-1"      #CCD2显示复位，收到信号即表示为新的产品，起始位置。

```
[串口参数]
serial type = "RTU"      #RTU模式
unit ID = "1"            #停止位1
baud rate = "115200"     #波特率 默认19200
parity (Even) = "2"      #偶校验
address1 = "4330"        #CCD1 输出信号对应PLC内部起始地址
address2 = "430"         #CCD2 输出信号对应PLC内部起始地址
address3 = "4430"        #CCD3 输出信号对应PLC内部起始地址
address4 = "4530"        #CCD4 输出信号对应PLC内部起始地址
```

> #### 参数如图

<div align="center">
    <img src="https://tc.jisicn.top/img/202404251628606.png" width="100%" height="100%"></img>
</div>


------

> #### MODBUS通讯设置

1. ##### 输入（启动端口）

   + M300~M308：启动CCD
   + M309：复位CCD1（配制参数中“端口号1”）   
   + M308：复位CCD2（配制参数中“端口号2”） 

2. ##### 输出

   + M4330~M4338：CCD1输出OK、NG端口/M4330：完成信号
   + M430~M438：CCD2输出OK、NG端口/M430：完成信号
   + M4430~M4438：CCD3输出OK、NG端口/M4430：完成信号
   + M4530~M4538：CCD4输出OK、NG端口/M4530：完成信号
   
   

------

> 更新后

1. ##### 输入（启动端口）

   + M5000~M5007：启动CCD（设置--参数--起始值）
   + M5008：复位CCD1（配制参数中“端口号1”）   
   + M5009：复位CCD2（配制参数中“端口号2”） 
   + M5010：复位CCD3（配制参数中“端口号3”） 

2. ##### 输出

   + M5100~M5108：CCD1输出OK、NG端口/M5100：完成信号
   + M5200~M5208：CCD2输出OK、NG端口/M5200：完成信号
   + M5300~M5308：CCD3输出OK、NG端口/M5300：完成信号
   + M5400~M5408：CCD4输出OK、NG端口/M5400：完成信号

--------

> #### 如何获取最新CCD程序

关注公众号，并发送**“CCD”**获取

<div align="center">
    <img src="https://tc.jisicn.top/img/202404251607047.png" width="40%" height="40%"></img>
</div>


------

<div align='center' ><font size='50'>END</font></div>

