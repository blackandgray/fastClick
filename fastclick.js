

function Fastclick () {
	this.endTime = 700;		// 判定是否触发click，如果大于700，则判定为不是click
	this.startTime = 0;
	this.body = document.body;
	this.init();
}

Fastclick.prototype.touchStart = function (event) {

	if (event.touches.length > 1) {		
		// 多手指触控不做处理
		return true;
	}

	this.target = event.target;
	this.startTime = event.timeStamp;

}

Fastclick.prototype.touchMove = function (event) {

	if (event.target !== this.target) {		
		// 如果移动元素，则不触发click
		this.target = null;
	}

}

Fastclick.prototype.touchEnd = function (event) {

	if (!this.target) {		
		// 如果移动元素，则不触发click
		return false;
	}

	if (event.timeStamp - this.startTime >= this.endTime) {
		// 判断如果松开和按下之间的间隔大于设定的 700ms，则不触发要click的事件
		return true;
	}

	this.startTime = 0;
	event.preventDefault();
	this.bindClick(this.target, event);

}

Fastclick.prototype.touchCancel = function () {

	this.target = null;

}

Fastclick.prototype.bindClick = function (target, event) {

	var touch = event.touches[0];

	// 创建一个鼠标点击事件
	var clickEvent = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true
	});

	clickEvent.forwardedTouchEvent = true;
	target.dispatchEvent(clickEvent);

	// 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性
	// https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/initMouseEvent
	// var clickEvent = document.createEvent('MouseEvents');
	// clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	// clickEvent.forwardedTouchEvent = true;
	// target.dispatchEvent(clickEvent);

}

Fastclick.prototype.init = function (target, event) {

	this.body.addEventListener('touchstart', this.touchStart.bind(this), false);
	this.body.addEventListener('touchmove', this.touchMove.bind(this), false);
	this.body.addEventListener('touchend', this.touchEnd.bind(this), false);
	this.body.addEventListener('touchcancel', this.touchCancel.bind(this), false);
	
}
