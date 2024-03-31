import express from "express";
import multer from "multer";
import {EnumsResult} from "./common/Enums.js";
import {useHeaderProperties} from "./common/HeaderProperties.js";
import {loadApi} from "./common/LoadApi.js";
import DataBaseModule from "./modules/DatabaseState.js";

const upload = multer();
const app = express();
const port = 4000;


// Список Api
let list_api = loadApi();

DataBaseModule.init();

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  useHeaderProperties(res);
  next();
});

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
  console.log(`Сервер запущен на порту: ${port}`);
});