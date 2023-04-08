function createNote(data){
	const em = document.createElement("pre");
	em.innerHTML = data;
	return em;
}

function createList(data){
	const task_div = document.createElement("div");
	for(let [check,task] of data){
		let chk = document.createElement("input");
		chk.setAttribute("type","checkbox");
		chk.checked = check === 0 ? true : false;
		chk.disabled = true;
		chk.id = Math.random();
		let text = document.createElement("label");
		text.innerHTML = task;
		text.setAttribute("for",chk.id);
		task_div.append(chk,text,document.createElement("br"));
	}
	return task_div;
}
function getCard(id,{data,type}){
	const card = document.createElement("div");
	const title = document.createElement("h2");
	title.innerHTML = id;
	card.className = "item";
	card.appendChild(title);

	let d_data = {};
	switch (type){
		case 0:d_data = createList(data);
			break;
		case 1:d_data = createNote(data);
			break;
	}
	card.appendChild(d_data);
	return card;
}

function addToBoard(card){
	board.appendChild(card);
}

function display(){
	for(let name of local.get(name_list)){
		let card = getCard(
			name,
			local.get(name)
		);
		addToBoard(card);
	}
}
