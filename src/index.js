post_data({
	mode:"r",
	id:name_list
}).then((res)=>{
	res.json().then(updateNL);
}).catch(console.warn);


setTimeout(display,1000);
