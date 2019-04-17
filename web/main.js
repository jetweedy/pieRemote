// Use the browser's built-in functionality to quickly and safely escape the
// string
function escapeHtml(str) {
var div = document.createElement('div');
div.appendChild(document.createTextNode(str));
return div.innerHTML;
};
 
// UNSAFE with unsafe strings; only use on previously-escaped ones!
function unescapeHtml(escapedStr) {
var div = document.createElement('div');
div.innerHTML = escapedStr;
var child = div.childNodes[0];
return child ? child.nodeValue : '';
};

function isEmpty(arg) {
  for (var item in arg) {
    return false;
  }
  return true;
}	

// ----------------------------------------------------------------
function fade(element,interval,increment,goal,opacity,callback,direction) {
	if (direction==undefined) { direction = goal<opacity ? -1 : 1; }
	if (goal==undefined) { goal = 0; }
	if (opacity==undefined) { opacity = 100; }
	if (direction < 0) {
		if ( opacity > goal ) {
			opacity = Math.max(0,opacity-increment);
			element.style.filter = "alpha(opacity="+leadDigits(""+opacity,2)+")";
			element.style.opacity = opacity/100;
		}
		if ( opacity > goal ) {
			setTimeout( jsCurry(fade,false,[element,interval,increment,goal,opacity,callback,direction]) , interval );
		} else {
			callback(element);
		}
	} else {
		if ( opacity < goal ) {
			opacity = Math.min(100,opacity+increment);
			element.style.filter = "alpha(opacity="+leadDigits(""+opacity,2)+")";
			element.style.opacity = opacity/100;
		}
		if ( opacity < goal ) {
			setTimeout( jsCurry(fade,false,[element,interval,increment,goal,opacity,callback,direction]) , interval );
		} else {
			callback(element);
		}
	}
}


// ----------------------------------------------------------------
// Allows use of shorthand $('some_element_id')
// 	instead of document.getElementById('some_element_id')
// ----------------------------------------------------------------
var _jet_ELEMENTS = [];
var $_ = function(x) {
	var r = false;
	if (!(r=_jet_ELEMENTS[x])) {
		if (_jet_ELEMENTS[x] = document.getElementById(x)) {
//			alert("Getting " + x + " for the first time.");
			r = _jet_ELEMENTS[x];
		}
	}
	return r;
}
//var $_ = $;

// Resource: http://www.dustindiaz.com/javascript-curry/
// This variation accepts an array of args (can be null or nonexistent) 
var jsCurry = function(fn, scope, args) {
	var scope = scope || window;
	if (!args) { args = []; }
	return function() {
		fn.apply(scope, args);
	};
}

//http://obvcode.blogspot.com/2007/11/easiest-way-to-check-ie-version-with.html
// 	if (ieBrowser.Version<7) { }
var ieBrowser = {
  Version: function() {
    var version = 999; // we assume a sane browser
    if (navigator.appVersion.indexOf("MSIE") != -1)
      // bah, IE again, lets downgrade version number
      version = parseFloat(navigator.appVersion.split("MSIE")[1]);
    return version;
  }
}

addTableRow = function(table, cells, thtd) {
	if (!thtd) { thtd = "td"; }
	if (ieBrowser.Version() < 8) {
		// http://msdn.microsoft.com/en-us/library/ms532998%28v=vs.85%29.aspx
		var row = table.insertRow();
		for (var i in cells) {
			if (thtd=="th") {
				var cell = document.createElement(thtd);
				cell = cells[i];
				row.appendChild(cell);
			} else {
				var cell = row.insertCell();
				cell.innerHTML = cells[i].innerHTML;
//				if (cells[i].onclick) { cell.onclick = cells[i].onclick; }
				if (cells[i].initfun) { cells[i].initfun(cell); }
			}
		}
	}
	else {
		var row = document.createElement("tr");
		table.appendChild(row);
		for (var i in cells) {
			var cell = document.createElement(thtd);
			cell = cells[i];
			if (cells[i].onclick) { cell.onclick = cells[i].onclick; }
			row.appendChild(cell);
		}
	}
	return table;
}


// Add to an object listener (without disrupting existing listener)
function addObjectEventFunction(obj, evt, fun)
{
	if (obj.addEventListener) // W3C standard
	{
		obj.addEventListener(evt, fun, false);
	} 
	else if (obj.attachEvent) // Microsoft
	{
		obj.attachEvent('on'+evt, fun);
	}
}


var displayObjectKeyValues = function(x)
{
	var op = "";
	for (var j in x) { op += j + ": " + x[j] + "\n" };
	return op;
}


// ----------------------------------------------------------------------------------

function showEm(svc, act, div)
{
	var em = "<a href='mailto:" + act + "@" + svc + ";'>" + act + "@" + svc + "</a>"
	div.parentNode.innerHTML = em;
//	unmaskEmails();
}

function unmaskEmails(ele)
{
	try
	{
		var em = ele.innerHTML;
		var rep = new RegExp("<\/?span>", 'gi');
		em = em.replace(rep,"","g");
		ele.href = "mailto:"+em;
	} catch(er) {}
}





function array_contains(a, v)
{
	if (a!=null)
	{
		for (var i=0;i<a.length;i++)
		{
			if (a[i]==v) { return true; }
		}
	}
	return false;
}



// ----------------------------------------------------------------------------------

function getKeyUnicode(e)
{
	var unicode = e.keyCode? e.keyCode : e.charCode;
	return unicode;
}



function parseInteger(n)
{
	var r = 0;
	try
	{
		r = parseInt(n);
	}
	catch(er) { };
	return r;
}

function isInteger(n)
{
	try {
		var x = parseInt(n);
	} catch(er) { return false; }
	if (isNaN(x)) { return false; }
	return true;
}

function isNumeric(n)
{
	try
	{
		var x = parseFloat(n);
	}
	catch(er)
	{
		return false;
	}
	return true;	
}

function leadDigits(n, d)
{
	var s = n.toString();
	while (s.length < d)
	{
		s = "0" + s;
	}
	return s;
}


// ----------------------------------------------------------------------------------


function cssHasClass(d,c)
{
	if (!(d.className)) { d.className = ""; }
	var dc = d.className.split(" ");
	for (var i=0;i<dc.length;i++)
	{
		if (dc[i]==c)
		{
			return true;
		}
	}
	return false;
}

function cssAddClass(d,c)
{
	cssRemoveClass(d,c);
	d.className = trim(d.className + " " + c);
}

function cssRemoveClass(d,c)
{

	var cn = "" + d.className;
	if ( (cn=="undefined") )
	{
		cn = "";
	}
	var dc = cn.split(" ");
	cn = "";
	for (var i=0;i<dc.length;i++)
	{
		if (dc[i]!=c)
		{
			cn += (" " + dc[i]);
		}
	}

	try
	{
		d.className = trim(cn);
	}
	catch(err)
	{
//		document.getElementById("debug").innerHTML = "(test): " + err + "<hr />";
		try
		{
			d.setAttribute("class",trim(cn));
		}
		catch(err)
		{
	//		document.getElementById("debug").innerHTML = "(test): " + err + "<hr />";
		}
	}


}



// ----------------------------------------------------------------------------------

document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
};

function toggleDisplay(d,p,v)	// div/object; position anchor object; vertical offset
{
	
	var toggleItems = document.getElementsByClassName(document.getElementById(d).className);
	if (document.getElementById(d).className!="")
	{
		for (i=0;i<toggleItems.length;i++)
		{
			if (toggleItems[i].id!=d)
			{
				document.getElementById(toggleItems[i].id).style.display = "none";
			}
		}
	}

	if (!(p)) { p = false; }
	if (!(v)) { v = false; }
	toggleVisibility(d,p,v);
	
}

function toggleVisibility(d,p,v)	// div/object; position anchor object; vertical offset
{

	if (document.getElementById(d))
	{
		if ((p)&&(v))
		{
			var posLeft = document.getElementById(p).offsetLeft;
			var posTop = document.getElementById(p).offsetTop + v;
			document.getElementById(d).style.left = posLeft.toString(10) + "px";
			document.getElementById(d).style.top = posTop.toString(10) + "px";
		}
		var dv = document.getElementById(d).style.display;
		if (dv=="none")
		{
			document.getElementById(d).style.display = "block";
		}
		else
		{
			document.getElementById(d).style.display = "none";
		}
	}
}



// ----------------------------------------------------------------------------------

function setCookie(name,value) {
	var v = ""+value;
	document.cookie = name+"="+escape(v);
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return false;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}




// ----------------------------------------------------------------------------------




// ----------------------------------------------------------------------------------

function parseJSON(j)
{
	var r = new Array();
	try
	{
		r = eval('('+j+')');
	}
	catch(er)
	{
		return r;
	}
	return r;
}

// ----------------------------------------------------------------------------------


function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
