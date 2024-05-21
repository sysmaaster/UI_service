import express from "express";
import path from "path";

const Fake = () => {
  const router = express.Router();

  router.post("/eventlist", async (req, res) => { 
    console.log("ds")
    const _basedir = path.resolve(path.resolve(), "public");
    console.log(_basedir)
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.sendFile(_basedir+"/2eventlist.html")
  });

  return router;
};

export default Fake;
