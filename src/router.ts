import express from "express";
import log from "./logger.service";
import axios from "axios";

const Router = () => {
  const router = express.Router();

  /** render index */
  router.get("/", async (req, res) => {
    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };
    try {
      let wallets: any = [];
      let categories: any = [];
      await axios
        .get("http://localhost:1242/", req)
        .then(function (res) {
          wallets = res.data;
        })
        .catch(function (error) {
          log.fatal(error + "  -  get wallet");
        });
      /* await axios
        .get("http://localhost:1243/categories", req)
        .then(function (res) {
          categories = res.data;
        })
        .catch(function (error) {
          log.fatal(error + "get categories");
        });*/
      const messages = req.flash("info");
      res.render("index", {
        locals,
        current: 1,
        pages: 10,
        messages,
        wallets,
        /*categories,*/
      });
    } catch (error) {
      console.log(error);
    }
  });

  /** render about */
  router.get("/about", (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };
    try {
      res.render("about", locals);
    } catch (error) {
      console.log(error);
    }
  });

  //** render wallet/add" */
  router.get("/wallet/add", (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

    res.render("wallet/add", locals);
  });

  //** Create wallet */
  router.post("/wallet/add", async (req, res) => {
    axios
      .post("http://localhost:1242/", req.body)
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
      .put(`http://localhost:1242/${req.params.id}`, req.body)
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

  /**render wallet/view */
  router.get("/wallet/view/:id", async (req, res) => {
    try {
      const wallets_item = await axios
        .get(`http://localhost:1242/${req.params.id}`)
        .then(function (res) {
          return res.data;
        })
        .catch(function (error) {
          log.fatal(error + "get wallet");
          return [];
        });
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      res.render("wallet/view", {
        locals,
        wallets_item,
      });
    } catch (error) {
      console.log(error);
    }
  });

  /** render wallet/edit */
  router.get("/wallet/edit/:id", async (req, res) => {
    try {
      const wallets_item = await axios
        .get(`http://localhost:1242/${req.params.id}`)
        .then(function (res) {
          return res.data;
        })
        .catch(function (error) {
          log.fatal(error + "get wallet");
          return [];
        });
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      res.render("wallet/edit", {
        locals,
        wallets_item,
      });
    } catch (error) {
      console.log(error);
    }
  });

  /** delete wallet */
  router.post("/wallet/drop/:id", async (req, res) => {
    try {
      await axios
        .delete(`http://localhost:1242/${req.params.id}`)
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

  //** render categories/add" */
  router.get("/categories/add", (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

    res.render("categories/add", locals);
  });

  //** Create Categories */
  router.post("/categories/add", async (req, res) => {
    axios
      .post("http://localhost:1243/", req.body)
      .then(function (response) {
        // console.log(response);

        req.flash("info", "New categories added.");
        res.redirect("/");
      })
      .catch(function (error) {
        log.fatal(error);
        res.sendStatus(500);
      });
  });

  return router;
};

export default Router;
