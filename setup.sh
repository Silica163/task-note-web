#!/usr/bin/sh

# rename this variable to data
DIR_NAME="data-"

mkdir $DIR_NAME
touch $DIR_NAME/db.json
chmod 666 $DIR_NAME/db.json
cat << EOF > $DIR_NAME/db.json
{
	"name_list":[
		"item1",
		"item2"
	],
	"item1":{
		"id":"item1",
		"type":1,
		"data":"this is just a test"
	},
	"item2":{
		"id":"item2",
		"type":0,
		"data":[
			[0,"this"],
			[1,"is"],
			[1,"another"],
			[0,"test"]
		]
	}
}
EOF
touch $DIR_NAME/config.json
echo {} > $DIR_NAME/config.json
