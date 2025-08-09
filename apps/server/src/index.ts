import http from "http";
import SocketService from "./services/socket";

// start the server
const startServer = async () => {
  // create a new socket service from SocketService class
  const socketService = new SocketService();
  // create a new http server
  const httpServer = http.createServer();
  // set the port
  const PORT = process.env.PORT || 8000;
  // attach the socket service to the http server
  socketService.getIo().attach(httpServer);
  // listen to the port
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  // initialize the socket listeners
  socketService.initListeners();
};

// start the server
startServer();
