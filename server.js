import http from "node:http";
import fs from "node:fs/promises";
import { WebSocketServer } from "ws";
import path from "path";

const PORT = process.env.PORT ?? 9000;

const httpServer = http.createServer(async function name(req, res) {
  const indexFile = await fs.readFile(path.resolve("./index.html"), "utf-8");
  res.setHeader("Content-Type", "text/html");
  return res.end(indexFile);
});

const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on("connection", (websocket) => {
  console.log("websocket connection...");

  websocket.on("message", (data) => {
    console.log("websocket message rec. ", data.toString());

    websocket.send("pong.... hello from the server");
  });
});

httpServer.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
