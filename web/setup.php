<?php
include("fun.php");
include("config.php");

$query = "CREATE TABLE IF NOT EXISTS `pieRemote_stack` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keystroke` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `passcode` varchar(50) NOT NULL,
  `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `passcode` (`passcode`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46;";
print $query; print "<hr />";
dbQuery($query);

?>