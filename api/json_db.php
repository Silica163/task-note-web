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
		$file = fopen($this->path,'r');
		$raw_data = fread($file,filesize($this->path));
		fclose($file);
		$decoded_data=json_decode($raw_data);
		$JSON_SUCCESS=0;
		if (json_last_error() != $JSON_SUCCESS)
			return false;
		$this->data=$decoded_data;
		return true;
	}
	// write data
	public function write(){
		$data_json = json_decode($this->data);
		$JSON_SUCCESS=0;
		if(!is_writeable($filepath) || json_last_error() != $JSON_SUCCESS)
			return false;
		$file = fopen($file_path,"w");
		$write_stt=fwrite($file,$data_json);
		fclose($file);

		return $write_stt;
	}
}

?>
