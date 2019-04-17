<?php



function dbQuery($query)
{
	$cr = dbCreds();

	$dbServer = $cr->Server;
	$dbHost = $cr->Host;
//	$dbPort = $cr->Port;
	$dbDatabase = $cr->Database;
	$dbUsername = $cr->Username;
	$dbPassword = $cr->Password;
	$dsn = 'mysql:dbname='.$dbDatabase.';host='.$dbHost; //.';port='.$dbPort;
	$db = new PDO($dsn, $dbUsername, $dbPassword);
	$query = trim($query);
	$q = array("numrows"=>0, "results"=>array(), "id"=>0);
	if (strtolower(substr($query,0,6))=="select") {
		$s = $db->query($query);
		if (!empty($s)) {
			$q['numrows'] = $s->rowCount();
			$q['results'] = $s->fetchAll(PDO::FETCH_ASSOC);
		} else {
//			print "\n\nEMPTY\n\n";
		}
	}
	else if (strtolower(substr($query,0,6))=="insert") {
		$s = $db->prepare($query);
		$s->execute();
//		$q['numrows'] = $s->rowCount();
		$q['id'] = $db->lastInsertId();
	}
	else if (strtolower(substr($query,0,6))=="update") {
		$s = $db->prepare($query);
		$s->execute();
		$q['numrows'] = $s->rowCount();
	}
	else if (strtolower(substr($query,0,6))=="delete") {
		$s = $db->prepare($query);
		$s->execute();
		$q['numrows'] = $s->rowCount();
	}
	else {
		$s = $db->prepare($query);
		$s->execute();
	}
//	print $query . "\n\n";
	return $q;
}


function grabVar($v)
{
	$r = "";
	if (isset($_GET[$v])) { $r = $_GET[$v]; }
	if (isset($_POST[$v])) { $r = $_POST[$v]; }
	$ts = "".$r;
	if (str_replace("'","",$ts)!=$ts)
	{
		$r = str_replace("'","&#39;",$r);
	}
	return $r;
}


?>