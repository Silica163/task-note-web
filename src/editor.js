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
	return data;
}

function saveNote(){
	const {id,data,type} = getNoteData();
	local.set(id,{data:data,type:type});
	writeItem(id);
	display();
}
