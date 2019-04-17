<?php

// A function to call up to grab credentials whenever needed for a DB query
function dbCreds() {
	$r = new stdClass();
	$r->Host = "__________________";
	$r->Server = "__________________";
//	$r->Port = "80";
	$r->Database = "__________________";
	$r->Username = "__________________";
	$r->Password = "__________________";
	return $r;	
}

// ---------------------------------------------------------------------

if (!isset($_SESSION)) {
	session_start();
}
$SESSION_ID = session_id();

ini_set('display_errors', 1);
ini_set("arg_separator.output","&amp;");
ini_set("post_max_size","5M");
ini_set("upload_max_filesize","5M");
ini_set("memory_limit", "100M");
ini_set( 'arg_separator.output' , '&amp;' );
ini_set( 'url_rewriter.tags' , 'a=href,area=href,frame=src,input=src,fieldset=' );



?>