import express from "express";
import log from "./logger.service";
import axios from "axios";

const categoriesRouter = () => {
  const router = express.Router();

  //** Create categories */
  router.post(
    "/categories/add",
    async (
      req: { body: any; flash: (arg0: string, arg1: string) => void },
      res: {
        redirect: (arg0: string) => void;
        sendStatus: (arg0: number) => void;
      }
    ) => {
      axios
        .post(process.env.CATEGORIES_URL || "", req.body)
        .then(function (response: any) {
          // console.log(response);

          req.flash("info", "New categories added.");
          res.redirect("/");
        })
        .catch(function (error: any) {
          log.fatal(error);
          res.sendStatus(500);
        });
    }
  );

  /** Update  categories */
  router.post(
    "/categories/edit/:id",
    async (
      req: {
        params: { id: any };
        body: any;
        flash: (arg0: string, arg1: string) => void;
      },
      res: {
        redirect: (arg0: string) => void;
        sendStatus: (arg0: number) => void;
      }
    ) => {
      log.fatal(req);
      await axios
        .put(`${process.env.CATEGORIES_URL || ""}/${req.params.id}`, req.body)
        .then(function (response: any) {
          console.log(response);

          req.flash("info", " categories ben edit.");
          res.redirect("/");
        })
        .catch(function (error: any) {
          log.fatal(error);
          res.sendStatus(500);
        });
    }
  );

  /** delete wallet */
  router.post(
    "/categories/drop/:id",
    async (
      req: { params: { id: any }; flash: (arg0: string, arg1: string) => void },
      res: {
        redirect: (arg0: string) => void;
        sendStatus: (arg0: number) => void;
      }
    ) => {
      try {
        await axios
          .delete(`${process.env.CATEGORIES_URL || ""}/${req.params.id}`)
          .then(function (response: any) {
            console.log(response);

            req.flash("info", " categories ben delete.");
            res.redirect("/");
          })
          .catch(function (error: any) {
            log.fatal(error);res.sendStatus(500);
          });
        const locals = {
          title: "View Customer Data",
          description: "Free NodeJs User Management System",
        };
      } catch (error) {
        log.fatal(error);
        res.sendStatus(500);
      }
    }
  );

  return router;
};

export default categoriesRouter;
