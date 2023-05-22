const bb = document.getElementById("blur_board");
bb.addEventListener("click",()=>{
	resetNoteData();
	resetListData();
});

// editor 

function edit(id){
	const {data,type} = local.get(id);
	if(type == 0)editList(id);
	if(type == 1)editNote(id);
}

// note editor
const note = document.getElementById("note_editor");

note.children["savebtn"].addEventListener("click",save);
note.children['cancelbtn'].addEventListener('click',resetNoteData);

const note_comp = note.children;

function resetNoteData(){
	note_comp['title'].value = "";
	note_comp['title'].disabled = false;
	note_comp['note'].value = "";
	note.setAttribute("status","");
	bb.setAttribute("status","");
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


function editNote(id){
	const {type,data} = local.get(id);
	note_comp['title'].value = id;
	note_comp['title'].disabled = true;
	note_comp['note'].value = data;
	note.setAttribute("status","active");
	bb.setAttribute("status","active");
}

// list editor

const list = document.getElementById("task_editor");

list.children['cancelbtn'].addEventListener('click',resetListData);
list.children['savebtn'].addEventListener('click',save);

const list_comp = list.children;

function getListData(){
	const listboard = list_comp['task'];
	var data = {
		id:list_comp['title'].value,
		data:[],
		type:0
	};

	for(let i of listboard.children){
		let list = i.children[0];
		data.data.push([Number(list.control.checked),list.innerText]);
	}

	resetListData();
	return data;
}

function resetListData(){
	list_comp['title'].value = "";
	list_comp['title'].disabled = false;
	list_comp['task'].innerHTML = "";
	list_comp['add_list'].children[0].value = "";
}

function editList(id){
	const {type,data} = local.get(id);

	list_comp["title"].value = id;
	list_comp['title'].disabled = true;

	const listBoard = list_comp["task"];
	listBoard.innerHTML = "";

	for(let [check, task] of data){
		let div = document.createElement("div");
		let del = document.createElement("div");
		del.className = "del";
		del.innerText = "X";
		del.addEventListener('click',deleteList);
		div.className = "checklist";
		div.append(createChecklist(task,check),del);
		listBoard.append(div);
	}
}


function deleteList(e){
	e.target.offsetParent.remove();
}

// list adder
const list_input = document.getElementById("list");

list_input.addEventListener("keyup",appendList);

function appendList(e){
	if(e.keyCode != 13)return;
	if(list_input.value == "")return;

	let div = document.createElement("div");
	let del = document.createElement("div");
	del.className = "del";
	del.innerText = "X";
	del.addEventListener("click",deleteList);
	div.className = "checklist";
	div.append(createChecklist(list_input.value),del);
	list_comp['task'].append(div);
	list_input.value = "";
}

// save function
function save(e){
	const parentId = e.target.parentNode.id;
	var editorData;
	if(parentId.startsWith("task")){
		editorData = getListData();
	} else {
		editorData = getNoteData();
	}
	const {id,type,data} = editorData;

	if(id == "")return;
	if(local.get(id) == undefined)
		local.set(name_list,local.get(name_list).concat(id));
	local.set(id,{data:data,type:type});

	writeItem(id);
	const card = getCard(id);
	if(card != null)addToBoard(card);
}

