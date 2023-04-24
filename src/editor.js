// editor 

function edit(id){
	const {data,type} = local.get(id);
	if(type == 0)editList(id);
	if(type == 1)editNote(id);
}

// note editor
const note = document.getElementById("note_editor");

note.children["savebtn"].addEventListener("mousedown",saveNote);
note.children['cancelbtn'].addEventListener('click',resetNoteData);

const note_comp = note.children;

function resetNoteData(){
	note_comp['title'].value = "";
	note_comp['title'].disabled = false;
	note_comp['note'].value = "";
}

function getNoteData(){
	const data = {};

	const id = note_comp['title'].value;
	const value = note_comp["note"].value;
	data.id = id;
	data.type = 1;
	data.data = value;

	resetNoteData();
	return data;
}

function saveNote(e){
	const {id,data,type} = getNoteData();
	if(id == null || id == "")return ;

	// update local
	if(local.get(id) == undefined)
		local.set(name_list,local.get(name_list).concat(id));
	local.set(id,{data:data,type:type});

	writeItem(id);
	const card = getCard(id);
	if(card != null)addToBoard(card);
}

function editNote(id){
	const {type,data} = local.get(id);
	note_comp['title'].value = id;
	note_comp['title'].disabled = true;
	note_comp['note'].value = data;
}

// list editor

const list = document.getElementById("task_editor");

list.children['cancelbtn'].addEventListener('click',resetListData);

const list_comp = list.children;

function resetListData(){
	list_comp['title'].value = "";
	list_comp['title'].disabled = false;
	list_comp['task'].innerHTML = "[ ] <input></input><br>";
}

function editList(id){
	const {type,data} = local.get(id);

	list_comp["title"].value = id;
	list_comp['title'].disabled = true;

	const listboard = list_comp["task"];
	listboard.innerHTML = "";

	for(let [check, task] of data){
		let text = document.createElement("label");
		let chk = document.createElement("input");

		chk.type = "checkbox";
		text.append(chk);
		text.innerHTML += task;
		text.children[0].checked = check === 0 ? false : true;

		listboard.append(text,document.createElement("br"));
	}

	listboard.append(
		"[ ] ",
		document.createElement("input",{type:"text"})
	);
}
