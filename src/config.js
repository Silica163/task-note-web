const api_url = "./api/post.php";
const data_type = ["list","note"];
const name_list = "name_list";
const local = new Map();

const template = document.createElement("div");
template.className = "item";
const note_head = document.createElement("h2");
const note_data = document.createElement("p");
template.append(note_head,note_data);
const board = document.getElementById("board");
board.appendChild(template);
