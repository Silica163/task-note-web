<?php

class json_db {
	// default data
	private $path;
	public $data;

	// set file path
	public function __construct($file_path='json_bff.json'){
		$this->path=$file_path;
		if(!file_exists($file_path))
			touch($file_path);
	}
	//get databse path
	public function getPath(){
		return $this->path;
	}

	// read data
	public function read(){
		$file = file_get_contents($this->path);
		$decoded_data=json_decode($file,true);
		$JSON_SUCCESS=0;
		if (json_last_error() != $JSON_SUCCESS)
			return false;
		$this->data=$decoded_data;
		return true;
	}
	// write data
	public function write(){
		$data_json = json_encode($this->data);
		$JSON_SUCCESS=0;
		$JSON_STT = json_last_error();
		if(!is_writeable($this->path) || !($JSON_STT == $JSON_SUCCESS))
			return false;
		$file = fopen($this->path,"w");
		$write_stt=fwrite($file,$data_json);
		fclose($file);

		return $write_stt;
	}
}

?>
