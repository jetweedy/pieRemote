<?php
include("fun.php");
include("config.php");

header("Content-type:text/json");

$action = grabVar("action");
$passcode = grabVar("passcode");

/*
Come up with some session logic to time out a remote after a certain amount of inactivity.
*/

switch($action) {
	
	case "put":
		$k = grabVar("k");
		$query = "INSERT INTO pieRemote_stack (keystroke, user_id, passcode) VALUES ('$k',0, '$passcode')";
		dbQuery($query);
		$query = "DELETE FROM pieRemote_stack WHERE ts < (DATE_SUB(NOW(), INTERVAL 1 MINUTE))";
		dbQuery($query);
		break;

	case "get":
		$min = grabNum("min");
		$query = "DELETE FROM pieRemote_stack WHERE ts < (DATE_SUB(NOW(), INTERVAL 1 MINUTE))";
		dbQuery($query);
		$q = dbQuery("SELECT * FROM pieRemote_stack WHERE passcode = '$passcode' AND id > $min");
//		print_r($q['results']);
//		if (rand(0,10)==5) {
//			$q['results'][] = array("id"=>0, "keystroke"=>"QUIT");
//		}
		$json = json_encode($q['results']);
		print $json;
		break;
		
	default:
		break;
		
}


?>