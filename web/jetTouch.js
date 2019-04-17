
var jetTouch_Element;
var jetTouch_StartTime;
var jetTouch_MousePos;

var jetTouch = function(element, options) {
	this.touchStartClientX = null;
	this.touchStartClientY = null;
	this.touchEndClientX = null;
	this.touchEndClientY = null;
	this.WaitingForHold = false;
	this.Element = element;
	this.Element.jetTouch = this;
	this.Trigger = this.Element;
	jetTouch_Element = null;
	this.IsTouchDevice = this.isTouchDevice();
	this.Listeners = {};
	
	this.Holding = false;
	this.Moved = false;
	this.Clicked = false;
	this.ClickTimeout = false;
	
	if (this.Options = options) {
		if (typeof this.Options.Trigger!="undefined") { this.Trigger = this.Options.Trigger; }
		if (typeof this.Options.Container=="undefined") { this.Options.Container = document.body; }
		if (typeof this.Options.maxMilliseconds=="undefined") { this.Options.maxMilliseconds = 500; }
		if (typeof this.Options.holdMilliseconds=="undefined") { this.Options.holdMilliseconds = 500; }
		if (typeof this.Options.minDistance=="undefined") { this.Options.minDistance = 20; }
		if (typeof this.Options.ClickTimeoutMilliseconds=="undefined") { this.Options.ClickTimeoutMilliseconds = 1000; }
		if (typeof this.Options.onUp=="undefined") { this.Options.onUp = function() {  }; }
		if (typeof this.Options.onDown=="undefined") { this.Options.onDown = function() {  }; }
		if (typeof this.Options.onLeft=="undefined") { this.Options.onLeft = function() {  }; }
		if (typeof this.Options.onRight=="undefined") { this.Options.onRight = function() {  }; }
		if (typeof this.Options.onNone=="undefined") { this.Options.onNone = function() {  }; }
		if (typeof this.Options.onMove=="undefined") { this.Options.onMove = function() {  }; }
		if (typeof this.Options.onStart=="undefined") { this.Options.onStart = function() {  }; }
		if (typeof this.Options.onEnd=="undefined") { this.Options.onEnd = function() {  }; }
		if (typeof this.Options.onHold=="undefined") { this.Options.onHold = function() {  }; }
		if (typeof this.Options.onRelease=="undefined") { this.Options.onRelease = function() {  }; }
		if (typeof this.Options.onDoubleClick=="undefined") { this.Options.onDoubleClick = function() {  }; }
	}
	this.Trigger.jetTouch = this;
	if (this.IsTouchDevice) {
		this.Listeners.touchstart = this.Trigger.addEventListener("touchstart",this.start);
		this.Listeners.touchmove = this.Trigger.addEventListener("touchmove",this.move);
		this.Listeners.touchend = this.Trigger.addEventListener("touchend",this.end);
	}// else {
//		this.Listeners.click = this.Trigger.addEventListener("click",this.click);
		this.Listeners.mousedown = this.Trigger.addEventListener("mousedown",this.start);
		this.Listeners.mousemove = document.addEventListener("mousemove",this.move);
		this.Listeners.mouseup = document.addEventListener("mouseup",this.end);
//	}
	
}
jetTouch.Functions = {
	"onStart": function() {
		this.__startingPos = this.jetTouch.getPosition(this);
//		this.style.position = "absolute";
//		this.style.top = this.__startingPos.y + "px";
//		this.style.left = this.__startingPos.x + "px";
	}
	,
	"onMove": function() {
		var x = jetTouch_Element.jetTouch.touchMoveClientX - jetTouch_Element.jetTouch.touchStartClientX;
		var y = jetTouch_Element.jetTouch.touchMoveClientY - jetTouch_Element.jetTouch.touchStartClientY;
		jetTouch_Element.style.position = "absolute";
//		console.log("this.Element: ", this.jetTouch.Element);
//		console.log("this.Container: ", this.jetTouch.Options.Container);
		var top = (jetTouch_Element.__startingPos.y+y);
		var left = (jetTouch_Element.__startingPos.x+x);

		if (jetTouch_Element.jetTouch.Options.Container!=null) {
			var pos = jetTouch_Element.jetTouch.getPosition(jetTouch_Element.jetTouch.Options.Container);
//			console.log(pos.x, pos.y);
			left -= pos.x;
			top -= pos.y;
//			var elepos = jetTouch_Element.jetTouch.getPosition(jetTouch_Element.jetTouch.Options.Container);
			var maxTop = jetTouch_Element.jetTouch.Options.Container.offsetHeight-jetTouch_Element.jetTouch.Element.offsetHeight;
			if (top > maxTop) { top = maxTop; }
			var maxLeft = jetTouch_Element.jetTouch.Options.Container.offsetWidth-jetTouch_Element.jetTouch.Element.offsetWidth;
			if (left > maxLeft) { left = maxLeft; }
			if (top < 0) { top = 0; }
			if (left < 0) { left = 0; }
//			console.log(top, maxTop, left, maxLeft);
		}
		jetTouch_Element.style.top = top + "px";
		jetTouch_Element.style.left = left + "px";
//		consoleClear(); consoleLog(x + ", " + y);
	}
	,
	"onHold": function() {
		console.log("onHold activated");
		jetTouch_Element.jetTouch.Holding = true;
		this.__startingSize = {y:this.offsetHeight, x:this.offsetWidth};
		this.__startingPos = this.jetTouch.getPosition(this);
		this.__resizing = {x:0,y:0};
		if (this.__startingPos.x > jetTouch_MousePos.x - 100) { this.__resizing.x = -1; }
		if (this.__startingPos.y > jetTouch_MousePos.y - 100) { this.__resizing.y = -1; }
		if (this.__startingPos.x + this.__startingSize.x < jetTouch_MousePos.x + 100) { this.__resizing.x = 1; }
		if (this.__startingPos.y + this.__startingSize.y < jetTouch_MousePos.y + 100) { this.__resizing.y = 1; }
//		this.style.position = "absolute";
//		this.style.top = this.__startingPos.y + "px";
//		this.style.left = this.__startingPos.x + "px";
//		console.clear();
//		console.log(jetTouch_MousePos.y - 100 + " < " + this.__startingPos.y);
//		console.log(this.__startingSize);
//		console.log(this.__startingPos);
//		console.log(jetTouch_MousePos);
//		console.log(this.__resizing);
	}
	,
	"onResize": function() {
		var x = this.jetTouch.touchMoveClientX - this.jetTouch.touchStartClientX;
		var y = this.jetTouch.touchMoveClientY - this.jetTouch.touchStartClientY;
		if (this.__resizing.x<0) {
//			this.style.position = "absolute";
			this.style.left = (this.__startingPos.x-x) + "px";
			this.style.width = (this.__startingSize.x + x) + "px"; 
		}
		if (this.__resizing.y<0) {
//			this.style.position = "absolute";
			this.style.top = (this.__startingPos.y-y) + "px";
			this.style.height = (this.__startingSize.y + y) + "px"; 
		}
		if (this.__resizing.x<1) {
//			this.style.position = "absolute";
			this.style.left = (this.__startingPos.x+x) + "px";
		}
		if (this.__resizing.y<1) {
//			this.style.position = "absolute";
			this.style.top = (this.__startingPos.y+y) + "px";
		}
		if (this.__resizing.x>0) {
//			this.style.left = (this.__startingPos.x+x) + "px";
			this.style.width = (this.__startingSize.x + x) + "px"; 
		}
		if (this.__resizing.y>0) {
//			this.style.top = (this.__startingPos.y+y) + "px";
			this.style.height = (this.__startingSize.y + y) + "px"; 
		}
	}
}
jetTouch.prototype = {
	isTouchDevice: function() {
		var el = document.createElement('div');
		el.setAttribute('ontouchstart', 'return;');
		return typeof el.ontouchstart === "function";
	}
	,
	getTouches: function(event) {
		if (event.touches!=undefined && event.touches!=null && !!event.touches) {
			return {clientX:event.touches[0].clientX + document.body.scrollLeft - document.body.clientLeft, clientY:event.touches[0].clientY + document.body.scrollTop - document.body.clientTop};
		} else {
			return {clientX:event.clientX + document.body.scrollLeft - document.body.clientLeft, clientY:event.clientY + document.body.scrollTop - document.body.clientTop};
		}
	}
	,
	getChangedTouches: function(event) {
		try {
			if (this.IsTouchDevice) {
				return {clientX:event.touches[0].clientX + document.body.scrollLeft - document.body.clientLeft, clientY:event.touches[0].clientY + document.body.scrollTop - document.body.clientTop};
			} else {
				return {clientX:event.clientX + document.body.scrollLeft - document.body.clientLeft, clientY:event.clientY + document.body.scrollTop - document.body.clientTop};
			}
		} catch(er) {
			return false;
		}
	}
	,
	getPosition: function( element ) {
		var r = {x:0,y:0};
		while( element != null ) {
			r.y += element.offsetTop;
			r.x += element.offsetLeft;
			element = element.offsetParent;
		}
		return r;
	}	
	,
	curry: function(fn, scope, args) {
		var scope = scope || window;
		if (!args) { args = []; }
		return function() {
			fn.apply(scope, args);
		};
	}

	,
	move: function(event) {
		if (jetTouch_Element!=null && jetTouch_Element!=undefined && jetTouch_Element.jetTouch.Holding) {
			if (!jetTouch_Element.jetTouch.IsTouchDevice) {
				event.preventDefault();
			}
			jetTouch_MousePos = {
				"x": jetTouch_Element.jetTouch.getTouches.apply(jetTouch_Element.jetTouch,[event]).clientX
				,
				"y": jetTouch_Element.jetTouch.getTouches.apply(jetTouch_Element.jetTouch,[event]).clientY
			}
			jetTouch_Element.jetTouch.touchMoveClientX = jetTouch_Element.jetTouch.getChangedTouches.apply(jetTouch_Element.jetTouch,[event]).clientX;
			jetTouch_Element.jetTouch.touchMoveClientY = jetTouch_Element.jetTouch.getChangedTouches.apply(jetTouch_Element.jetTouch,[event]).clientY;
//			console.log("jetTouch_Element", jetTouch_Element);
			jetTouch_Element.jetTouch.Options.onMove.apply(jetTouch_Element, [event]);
		}
	}

	
	,
	start: function(event) {
//		console.clear();
//		console.log("start");
//		console.log(event);
		jetTouch_Element = this.jetTouch.Element;
		
		//// Handle doubleclick logic
		if (!!this.jetTouch.ClickTimeout) {
			clearTimeout(this.jetTouch.ClickTimeout);
		}
		if (!jetTouch_Element.jetTouch.Clicked) {
			jetTouch_Element.jetTouch.Clicked = true;
			this.ClickTimeout = setTimeout(jetTouch.prototype.curry(function() {
				this.Clicked = false;
			},this.jetTouch , []), jetTouch_Element.jetTouch.Options.ClickTimeoutMilliseconds);
		} else {
			jetTouch_Element.jetTouch.Clicked = false;
			jetTouch_Element.jetTouch.Options.onDoubleClick.apply(jetTouch_Element, []);
		}
		
		
		var ele = document.elementFromPoint(event.clientX, event.clientY);
		jetTouch_StartTime = (new Date()).getTime();
//		if (jetTouch_Element.jetTouch.Options.holdMilliseconds>0) {
			jetTouch_Element.jetTouch.HoldTimeout = setTimeout( jetTouch_Element.jetTouch.curry(jetTouch_Element.jetTouch.Options.onHold,jetTouch_Element,[]), jetTouch_Element.jetTouch.Options.holdMilliseconds);
//		} else {
//			jetTouch_Element.jetTouch.Options.onHold.apply(jetTouch_Element, []);
//		}
		if (jetTouch_Element!=null && jetTouch_Element!=undefined) {
			jetTouch_MousePos = { 
				"x": jetTouch_Element.jetTouch.getTouches.apply(jetTouch_Element.jetTouch,[event]).clientX
				,
				"y": jetTouch_Element.jetTouch.getTouches.apply(jetTouch_Element.jetTouch,[event]).clientY		
			};
		} else { 
			jetTouch_MousePos = {
				x:event.clientX + document.body.scrollLeft - document.body.clientLeft
				,
				y:event.clientY + document.body.scrollTop - document.body.clientTop
			}; 
		}
		jetTouch_Element.jetTouch.touchStartClientX = jetTouch_MousePos.x;
		jetTouch_Element.jetTouch.touchStartClientY = jetTouch_MousePos.y;
		if (!jetTouch_Element.jetTouch.IsTouchDevice) {
			event.preventDefault();
		}
		jetTouch_Element.jetTouch.Options.onStart.apply(jetTouch_Element);

	}
	,
	end: function(event) {
//		console.log("end");
//		console.log(event);
		if (jetTouch_Element!=undefined && !!jetTouch_Element.jetTouch.HoldTimeout) {
			clearTimeout(jetTouch_Element.jetTouch.HoldTimeout);
		}
		
		if (jetTouch_Element!=undefined && jetTouch_Element.jetTouch.Holding) {
			jetTouch_Element.jetTouch.Options.onRelease.apply(jetTouch_Element);
			jetTouch_Element.jetTouch.Holding = false;
			jetTouch_Element.jetTouch.Moved = false;
		}
		
		if (jetTouch_Element!=null && jetTouch_Element!=undefined && (new Date()).getTime() < jetTouch_StartTime + jetTouch_Element.jetTouch.Options.maxMilliseconds) {
			jetTouch_Element.jetTouch.touchEndClientX = jetTouch_Element.jetTouch.getChangedTouches.apply(jetTouch_Element.jetTouch,[event]).clientX;
			jetTouch_Element.jetTouch.touchEndClientY = jetTouch_Element.jetTouch.getChangedTouches.apply(jetTouch_Element.jetTouch,[event]).clientY;
			var dx = jetTouch_Element.jetTouch.touchEndClientX - jetTouch_Element.jetTouch.touchStartClientX;
			var absDx = Math.abs(dx);
			var dy = jetTouch_Element.jetTouch.touchEndClientY - jetTouch_Element.jetTouch.touchStartClientY;
			var absDy = Math.abs(dy);		
//			console.log(dy, absDy, jetTouch_Element.jetTouch.Options.minDistance, dx, absDx, jetTouch_Element.jetTouch.Options.minDistance);
			if (absDy > jetTouch_Element.jetTouch.Options.minDistance || absDx > jetTouch_Element.jetTouch.Options.minDistance) {
				if (absDy > absDx) {
					if (dy > 0) {
						jetTouch_Element.jetTouch.Options.onDown.apply(jetTouch_Element);
					} else {
						jetTouch_Element.jetTouch.Options.onUp.apply(jetTouch_Element);
					}
				} else {
					if (dx > 0) {
						jetTouch_Element.jetTouch.Options.onRight.apply(jetTouch_Element);
					} else {
						jetTouch_Element.jetTouch.Options.onLeft.apply(jetTouch_Element);
					}
				
				}
			} else {
				jetTouch_Element.jetTouch.Options.onNone.apply(jetTouch_Element);
			}
		}
		if (jetTouch_Element!=null) {
			jetTouch_Element.jetTouch.Options.onEnd.apply(jetTouch_Element);
			jetTouch_Element = null;
		}
	}

}






