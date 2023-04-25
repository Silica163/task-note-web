function deleteCard(e){
	if(e.buttons != 1)return;
	const id = e.target.parentNode.id;

	const card = document.getElementById(id);
	if(card != null)card.remove();

	removeItem(id);
}

function editCard(e){
	if(e.buttons != 1)return;
	if(e.target.className == "del")return;
	const id = e.target.closest("section > div").id;
	edit(id);
}

function createNote(data){
	const em = document.createElement("pre");
	em.innerText = data;
	return em;
}

function createList(data){
	const task_div = document.createElement("div");
	for(let [check,task] of data){
		let chk = document.createElement("input");
		chk.type = "checkbox";
		chk.disabled = true;
		let text = document.createElement("label");
		text.append(chk);
		text.innerHTML += task;
		text.children[0].checked = check ;
		task_div.append(text,document.createElement("br"));
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

function updateCard(id){
	const data = local.get(id);
	const card = document.getElementById(id);
	if(data.data == null || data.data == ""){
		removeItem(id);
		card.remove();
		return null;
	}
	card.childNodes[3].remove();
	card.appendChild(createData(data));
}

function createData({data,type}){
	switch (type){
		case 0:return createList(data);
			break;
		case 1:return createNote(data);
			break;
	}
}

function getCard(id){
	const exists_card = document.getElementById(id);

	// if the card was created overwride it insted of create a new one.
	if(exists_card == null){
		return createCard(id);
	}

	updateCard(id);
	return null;
}


function addToBoard(card){
	board.appendChild(card);
}

function display(){
	for(let name of local.get(name_list)){
		let card = getCard(name);
		// When card is null that's mean it has been created.
		if(card != null)
			addToBoard(card);
	}
}
