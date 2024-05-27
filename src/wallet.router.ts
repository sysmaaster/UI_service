import express from "express";
import log from "./logger.service";
import axios from "axios";


const walletRouter = () => {
  const router = express.Router();

  //** Create wallet */
  router.post("/wallet/add", async (req, res) => {
    axios
      .post(process.env.WALLET_URL ||"", req.body)
      .then(function (response) {
        // console.log(response);

        req.flash("info", "New wallet added.");
        res.redirect("/");
      })
      .catch(function (error) {
        log.fatal(error);
        res.sendStatus(500);
      });
  });

  /** Update  wallet */
  router.post("/wallet/edit/:id", async (req, res) => {
    log.fatal(req);
    await axios
      .put(`${process.env.WALLET_URL ||""}/${req.params.id}`, req.body)
      .then(function (response) {
        console.log(response);

        req.flash("info", " wallet ben edit.");
        res.redirect("/");
      })
      .catch(function (error) {
        log.fatal(error);
        res.sendStatus(500);
      });
  });

  /** delete wallet */
  router.post("/wallet/drop/:id", async (req, res) => {
    try {
      await axios
        .delete(`${process.env.WALLET_URL ||""}/${req.params.id}`)
        .then(function (response) {
          console.log(response);

          req.flash("info", " wallet ben delete.");
          res.redirect("/");
        })
        .catch(function (error) {
          log.fatal(error);
        });
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};

export default walletRouter;
