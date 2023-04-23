const note = document.getElementById("note_editor");

note.children["savebtn"].addEventListener("mousedown",saveNote);

const note_comp = note.children;

function getNoteData(){
	const data = {};

	const id = note_comp['title'].value;
	const value = note_comp["note"].value;
	data.id = id;
	data.type = 1;
	data.data = value;

	note_comp['title'].value = "";
	note_comp['note'].value = "";
	return data;
}

function saveNote(e){
	if(e.buttons != 1)return;
	const {id,data,type} = getNoteData();
	if(id == null || id == "")return ;

	// update local
	local.set(name_list,local.get(name_list).concat(id));
	local.set(id,{data:data,type:type});

	writeItem(id);
	updateCard(id);
}
