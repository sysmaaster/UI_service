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
        .get(process.env.WALLET_URL ||"", req)
        .then(function (res) {
          wallets = res.data;
        })
        .catch(function (error) {
          log.fatal(error + "  -  get wallet");
        });
       await axios
        .get(process.env.CATEGORIES_URL ||"", req)
        .then(function (res) {
          categories = res.data;
        })
        .catch(function (error) {
          log.fatal(error + "get categories");
        });
      const messages = req.flash("info");
      res.render("index", {
        locals,
        current: 1,
        pages: 10,
        messages,
        wallets,
        categories,
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

  /** render wallet/view */
  router.get("/wallet/view/:id", async (req, res) => {
    try {
      const wallets_item = await axios
        .get(`${process.env.WALLET_URL ||""}/${req.params.id}`)
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
        .get(`${process.env.WALLET_URL ||""}/${req.params.id}`)
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
  //** render categories/add" */
  router.get("/categories/add", (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

    res.render("categories/add", locals);
  });
  /** render wallet/edit */
  router.get("/categories/edit/:id", async (req, res) => {
    try {
      const categories_item = await axios
        .get(`${process.env.CATEGORIES_URL ||""}/${req.params.id}`)
        .then(function (res) {
          return res.data;
        })
        .catch(function (error) {
          log.fatal(error + "get categories");
          return [];
        });
      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      res.render("categories/edit", {
        locals,
        categories_item,
      });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};

export default Router;
