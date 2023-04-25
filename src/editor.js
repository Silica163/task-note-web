// editor 

function edit(id){
	const {data,type} = local.get(id);
	if(type == 0)editList(id);
	if(type == 1)editNote(id);
}

// note editor
const note = document.getElementById("note_editor");

note.children["savebtn"].addEventListener("click",saveNote);
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
list.children['savebtn'].addEventListener('click',saveList);

const list_comp = list.children;

function getListData(){
	const listboard = list_comp['task'].children[0];
	var data = {
		id:list_comp['title'].value,
		data:[]
	};

	for(let i of listboard.children){
		if( i.localName == "br")continue;

		let check = i.control.checked;
		data.data.push([Number(check),i.innerText]);
	}

	resetListData();
	return data;
}

function saveList(){
	const {id,data} = getListData();

	if(id == "")return;
	if(local.get(id) == undefined)
		local.set(name_list,local.get(name_list).concat(id));
	local.set(id,{data:data,type:0});

	writeItem(id);
	const card = getCard(id);
	if(card != null)addToBoard(card);
}

function resetListData(){
	list_comp['title'].value = "";
	list_comp['title'].disabled = false;
	list_comp['task'].children[0].innerHTML = "";
	list_comp['task'].children[1].children[0].value = "";
}

function editList(id){
	const {type,data} = local.get(id);

	list_comp["title"].value = id;
	list_comp['title'].disabled = true;

	const listboard = list_comp["task"].children[0];
	listboard.innerHTML = "";

	for(let [check, task] of data){
		listboard.append(createChecklist(task,check));
	}
}

// list adder
const list_input = document.getElementById("list");

list_input.addEventListener("keyup",appendList);

function appendList(e){
	if(e.keyCode != 13)return;
	if(list_input.value == "")return;
	list_comp['task'].children[0].append(createChecklist(list_input.value));
	list_input.value = "";
}
