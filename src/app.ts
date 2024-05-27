import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import flash from "connect-flash";
import bodyParser from "body-parser";
import expressLayout from 'express-ejs-layouts'
import session from 'express-session';
import path from "path";
import Router from "./router";
import categoriesRouter from "./categories.router";
import walletRouter from "./wallet.router";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.use(methodOverride("_method"));

// Static Files
app.use(express.static(path.resolve(path.resolve(), "public")));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client

// Flash Messages
app.use(flash()); //{ sessionKeyName: 'flashMessage' }

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set("view engine", "ejs"); // configure template engine
app.set("views", path.resolve(path.resolve(), "views")); // set express to look in this folder to render our view

// Routes 
app.use( Router());
app.use( categoriesRouter());
app.use( walletRouter());

export default app;
