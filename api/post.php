<?php
function check_request(){
	if($_SERVER["REQUEST_METHOD"] != "POST")return false;
	if(getallheaders()["Content-type"] != "application/json")return false;
	return true;
}
if(!check_request()){
	http_response_code(400);
	exit();
}
echo "<pre>";
echo $_SERVER["REQUEST_METHOD"]." ".$_SERVER["REQUEST_URI"]." ".$_SERVER["SERVER_PROTOCOL"]."\n";
foreach (getallheaders() as $name => $value) {
	echo "$name: $value \n";
}
echo file_get_contents("php://input");
// 400: $text = 'Bad Request'
echo "</pre>";
?>
