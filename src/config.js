const api_url = "./api/post.php";
const data_type = ["list","note"];
const name_list = "name_list";
const local = new Map();

const note_template = document.createElement("div");
note_template.className = "item";
const note_head = document.createElement("h2");
const note_data = document.createElement("p");
note_template.append(note_head,note_data);
const board = document.getElementById("board");
board.appendChild(note_template);
