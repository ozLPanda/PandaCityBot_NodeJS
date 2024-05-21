import express from "express";
import multer from "multer";
import {EnumsResult} from "./common/Enums.js";
import {useHeaderProperties} from "./common/HeaderProperties.js";
import {loadApi} from "./common/LoadApi.js";
import DataBaseModule from "./modules/DatabaseState.js";
import {createServer} from "node:http";
import {Server} from "socket.io";
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';


const upload = multer();
const app = express();
app.use(cors());

const port = 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer(app);
const io = new Server(server);




// Список Api
let list_api = loadApi();

DataBaseModule.init();

io.on("connect", (socket)=>{
  console.log("New user connected!");
  console.log(socket);
  socket.emit("connectResponse", {status: "OK"});
});

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  useHeaderProperties(res);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname, 'testApp.html');
});

app.get('/test_assets/socket.io.min.js', (req, res)=>{
  res.sendFile(join(__dirname+"/test_assets/", 'socket.io.min.js'));
})

app.all('/p/api/:category.:method', upload.none(), async (req, res) => {
  const c = req.params.category;
  const m = req.params.method;
  // GET
  const q = req.query;
  // POST
  const b = req.body;
  let response = null;

  let info = {
    about: 'ozLiginus - Panda Studio',
    server: 's1',
    category: c,
    method: m,
    //GET
    query: q,
    // POST
    params: b
  };

  try {
    if (list_api[c] != null) {
      response = await list_api[c].find(i => i.name == m)?.(req);
    }else{
      res.send({ status: EnumsResult.Failure, info, error:{name: "not_found", text: "404 Not found"}});
    }
  }catch (ex){
    console.error(ex);
    res.send({ status: EnumsResult.Failure, info, error: ex });
    throw new Error();
  }

  res.send({
    status: EnumsResult.Success,
    info,
    response
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту: http://localhost:${port}`);
});
