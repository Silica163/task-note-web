function createChecklist(task,check=0,disabled=false){
	let text = document.createElement("label");
	let chk = document.createElement("input");

	chk.checked = check;
	chk.disabled = disabled;
	chk.type = "checkbox";
	text.append(chk,task);
	return text;

}

function createNote(data){
	const em = document.createElement("pre");
	em.innerText = data;
	return em;
}

function createList(data){
	const task_div = document.createElement("div");
	task_div.className = "container";
	for(let [check,task] of data){
		task_div.append(createChecklist(task,check,true),document.createElement("br"));
	}
	return task_div;
}

function createCard(id){
	const {data,type} = local.get(id);
	const card = document.createElement("div");
	const title = document.createElement("h2");
	title.innerText = id;
	card.id = id;
	card.className = "item";
	card.appendChild(title);
	card.innerHTML += "<div class=del>X</div><hr>";
	card.appendChild(createData({data:data,type:type}));

	card.childNodes[1].addEventListener("mousedown",deleteCard);
	card.addEventListener("mousedown",editCard);
	return card;
}

function createData({data,type}){
	switch (type){
		case 0:return createList(data);
			break;
		case 1:return createNote(data);
			break;
	}
}

