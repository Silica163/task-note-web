const api_url = "./api/post.php";
const data_type = ["list","note"];
const name_list = "name_list";
const local = new Map();

const board = document.getElementById("board");
var firstrun = true;
function data_ready(){
	return local.get(name_list).length == Object.keys(localStorage).length - 1 &&
		local.get(name_list).length == local.size - 1 && firstrun;
}
