
关于移动端click事件的300ms延迟现象

移动端的click事件300ms延迟是因为浏览器为了判断当前事件是否双击（double click）而在触发touchend事件后等待用户约300ms（因为移动网页双击可以缩放视图），若用户没有再次点击则默认触发click事件。
（https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away）

谷歌在官方网站声明Chrome32（2014年）已经处理这个问题，官方给出的解决方案是在head标签里添加meta信息：
<meta name="viewport" content="width=device-width">
原理是强制设置窗口宽度跟设备宽度一致，浏览器会默认取消双击缩放。

苹果系统直到2016年3月IOS9.3版本才处理延迟，所以未更新的苹果手机还会有延迟现象。

触发点击事件的先后顺序为：touchstart -> touchmove -> touchend -> click

一种替代解决方案是使用 touchstart 或者 touchend 来代替click事件，但这个方法还是有不足之处的，例如在拖动元素的时候也会触发，但这并不是click事件想要做的事情。

现有的解决方案 FastClick 是通过touchstart、touchend结合来模拟实现的。