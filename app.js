const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const ApiError = require("./utils/ApiError");
const authRoute = require("./routes/auth.route");
require("dotenv").config();
const {
	errorConverter,
	errorHandler,
} = require("./pkg/middleware/errorHandler");
const { authJWT, handleJWTError } = require("./pkg/middleware/authJWT");
require("dotenv").config();
const db_url = process.env.DB_URL;
const port = process.env.PORT;
//---Connect DB ----//
mongoose.connect(db_url).then(() => {
	console.log("Connect MongoDB successfully");

	app.listen(port, () => {
		console.log("Listen at port: ", port);
	});
});

//---Connect DB ----//

app.use(cors());
app.use(morgan("dev"));
app.use(authJWT());
app.use(handleJWTError);
app.use(express.json());

//-- Here we code --//
app.get("/ping", (req, res) => {
	res.json({
		message: "pong",
	});
});
app.use(`${process.env.API_URI}/auth`, authRoute);

//-- Here we code --//

app.use((req, res, next) => {
	next(new ApiError(404, "Url not found!"));
});

app.use(errorConverter);
app.use(errorHandler);
