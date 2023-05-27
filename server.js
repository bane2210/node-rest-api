const path = require("path");
const PORT = process.env.PORT || 3500;
const express = require("express");
const { logger } = require("./middleware/logEvents");
const app = express();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const subdirRouter = require("./routes/subdir");
const rootRouter = require("./routes/root");
const employeesRouter = require("./routes/API/employees");

app.use(logger);

// list of allowed origins
const whiteList = [
  "http://localhost:3500",
  "http://127.0.0.1:5500",
  "https://www.google.rs",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin: ", origin);
    // || !origin je samo za development zato sto je tada origin = undefined
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Nije dozvoljeno by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// svi requests will enter this middleware
// url encoded data
app.use(express.urlencoded({ extended: false }));

// built in middleware for json request data
app.use(express.json());

// built in middleware for serving static files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/subdir", subdirRouter);
app.use("/", rootRouter);
app.use("/employees", employeesRouter);

// .all() prihvata i regex za razliku od .use()
app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html"))
    res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ error: "404 not found" });
  else if (req.accepts("txt")) res.type("txt").send("404 not found");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port - ${PORT}`));
