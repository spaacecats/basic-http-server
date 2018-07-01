 const server = require("./server");
 const router = require("./router");
 const requestHandlers = require("./requestHandlers");
 
 let handle = {};
 handle["/"] = requestHandlers.start;
 handle["/start"] = requestHandlers.start;
 handle["/track"] = requestHandlers.track;
 handle["/count"] = requestHandlers.count;
 
 server.start(router.route, handle);