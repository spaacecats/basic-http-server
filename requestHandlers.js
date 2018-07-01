const querystring = require("querystring");
const fs = require("fs");
const path = require("path");

function start(response){
	console.log("Request handler 'start' was called.");
	
	let body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>'+
	'</head>'+
	'<body>'+
	'<form action="/track" method="post">'+
	'<textarea name="text" rows="30" cols="60"></textarea>'+
	'<input type="submit" value="Submit text"/>'+
	'</form>'+
	'</body>'+
	'</html>';
	
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();	
};

function track(response, postData){
	console.log("Request handler 'track' was called.");
	
	let postText = querystring.parse(postData).text;
	
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("You have sent the text: "+postText);
	response.end();

	let postJSONObject = postTextToJSON(postText);
	let postJSONString = JSON.stringify(postJSONObject);
	
	fs.appendFile("postData.json", postJSONString, function(err){
		if(err)throw err;
	});
	//fs.writeFileSync(path.join(__dirname, 'postData.json'), postJSONString);
	console.log("Data saved.");
	//TODO: check JSON object for 'count' parameter, connect to Redis, increment count value
};

function count(response){
	console.log("Request handler 'count' was called.");
	let count = 0;
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("Asking database for count...");
	response.end();
	//TODO: query the database function -> respond with query result
};

function postTextToJSON(postText) {  
	let pairs = postText.split('\r\n');
	
	let result = {};
	pairs.forEach(function(pair){
		pair = pair.split('=');
		result[pair[0]] = (pair[1] || '');
	});
	return JSON.parse(JSON.stringify(result));
};
	
exports.track = track;
exports.start = start;
exports.count = count;