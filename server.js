const http = require("http");
const url = require("url");

 function start(route, handle) {
	 function onRequest(request, response){
		let pathname = url.parse(request.url).pathname;
		let postData = "";
		console.log("Request for route "+pathname+" received.");
		 
		request.setEncoding("utf8");
		 
		request.addListener("data", function(postDataChunk){
			 postData += postDataChunk;
			 console.log("Received POST data chunk '"+postDataChunk+"'.");
		});
		 
		request.addListener("end", function(){
			route(handle, pathname, response, postData);
		});
	 };
 
	 http.createServer(onRequest).listen(8888);
	 console.log("Server has started");
 };
	 
	 exports.start = start;