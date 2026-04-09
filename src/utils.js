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
	const task_div = document.createElement("div");
	task_div.className = "container";
	const em = document.createElement("pre");
	em.innerText = data;
	task_div.appendChild(em);
	return task_div;
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
	card.id = id;
	card.className = "item";
	const info = document.createElement("div");
	info.className = "info"
	info.innerHTML += `<h2>${id}</h2>`
	const btn = document.createElement("button");
	btn.className = "del";
	btn.innerText = "X";
	btn.addEventListener("click", (e) => {
		e.stopPropagation()
		removeItem(id);
		card.remove()
	});
	info.appendChild(btn);
	card.appendChild(info)
	card.appendChild(document.createElement("hr"))
	card.appendChild(createData({data:data,type:type}));
	card.addEventListener("click", (e)=>{
		edit(id)
	});
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

