<?php
include("fun.php");
include("config.php");

$passcode = grabVar("passcode");
if ($passcode=="") { 
	$passcode = isset($_SESSION['passcode']) ? $_SESSION['passcode'] : generateRandomString(10);
}
$_SESSION['passcode'] = $passcode;

?>

<h1 style="text-align:center;">
<?php print $_SESSION['passcode']; ?>
</h1>

<script type="text/javascript" src="../jetTouch/jetTouch.js"></script>
<script type="text/javascript">
function addToStack(x) {
	ajax("GET", "actions.php", "action=put&k="+x+"&passcode=<?php print $_SESSION['passcode']; ?>", function(){}, false);
}
</script>

<style type="text/css">
button, input[type="submit"], input[type="button"] {
    border-radius: 0px;
	-webkit-appearance: none;
    -webkit-border-radius: 0px;
    background-color:#eee;
    padding:1px;
}

#contain {
	text-align:center;
}

#btn_up {
	margin:1% auto;
	height:300px;
	width:40%;
	font-size:8em;
	display:block;
}
#btn_down {
	margin:1% auto;
	height:300px;
	width:40%;
	font-size:8em;
	display:block;
}
#btn_left {
	margin:1%;
	height:300px;
	width:20%;
	font-size:8em;
	display:inline-block;
}
#btn_spacebar {
	margin:1%;
	height:300px;
	width:40%;
	font-size:8em;
	display:inline-block;
}
#btn_right {
	margin:1%;
	height:300px;
	width:20%;
	font-size:8em;
	display:inline-block;
}
#touchpad {
	height:400px;
	width:82%;
	border:1px solid gray;
	margin-left:auto;
	margin-right:auto;
}
#btn_leftclick {
	margin:1%;
	height:300px;
	width:40%;
	font-size:8em;
	display:inline-block;
}
#btn_leftdoubleclick {
	margin:1%;
	height:300px;
	width:26%;
	font-size:8em;
	display:inline-block;
}
#btn_rightclick {
	margin:1%;
	height:300px;
	width:40%;
	font-size:8em;
	display:inline-block;
}

</style>


<form method="get">
	<p style="font-size:2em; text-align:center; vertical-align:middle;">
		Choose a Code: <input type="text" style="font-size:2em;" name="passcode" />
		<input style="font-size:2em;" type="submit" value="Go!" value="<? print $passcode; ?>" />
	</p>
</form>
<hr />

<div id="contain">
	<button id="btn_up">^</button>
	<button id="btn_left"> &lt; </button><button id="btn_spacebar">__</button><button id="btn_right"> &gt; </button>
	<button id="btn_down">v</button>
	<div id="touchpad"></div>
	<div id="mousebuttons">
	<button id="btn_leftclick">L</button>
	<!--
	<button id="btn_leftdoubleclick">L<sup>2</sup></button>
	-->
	<button id="btn_rightclick">R</button>
	</div>
</div>
<script type="text/javascript">
document.getElementById('btn_leftclick').addEventListener("click", function() {
	addToStack('LEFTCLICK');
});
//document.getElementById('btn_leftdoubleclick').addEventListener("click", function() {
//	addToStack('LEFTDOUBLECLICK');
//});
document.getElementById('btn_rightclick').addEventListener("click", function() {
	addToStack('RIGHTCLICK');
});
document.getElementById('btn_up').addEventListener("click", function() {
	addToStack('UP');
});
document.getElementById('btn_down').addEventListener("click", function() {
	addToStack('DOWN');
});
document.getElementById('btn_left').addEventListener("click", function() {
	addToStack('LEFT');
});
document.getElementById('btn_spacebar').addEventListener("click", function() {
	addToStack('%20');
});
document.getElementById('btn_right').addEventListener("click", function() {
	addToStack('RIGHT');
});
var swiper = document.getElementById('touchpad');
swiper.jetTouch = new jetTouch( swiper , {
	"onRelease": function(e) {
		var pos = this.jetTouch.getPosition(this);
//		console.log(pos);
		console.log(this.jetTouch);
		var pxX = this.jetTouch.touchStartClientX - pos.x;
		var pxY = this.jetTouch.touchStartClientY - pos.y;
		var w = this.offsetWidth;
		var h = this.offsetHeight;
		// Finally get the percentages of the touches within the screen
		dX = pxX/w;
		dY = pxY/h;
		addToStack('{"TOUCH":{"x":'+dX+',"y":'+dY+'}}');
	}
//	, "onUp": function() { console.clear(); console.log("up!"); }
//	, "onDown": function() { console.clear(); console.log("down!"); }
//	, "onLeft": function() { console.clear(); console.log("left!"); }
//	, "onRight": function() { console.clear(); console.log("right!"); }
	, "onNone": function() { }
});

</script>



<?php
//include("../../includes/footer.php");
?>