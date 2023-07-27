const express = require("express");
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const { API_ENDPOINT_NOT_FOUND_ERR } = require("./errors");
const PORT = process.env.PORT || 3000;
const connectDB = require("./server/Database/connection");

app.use(bodyParser.json());
app.use("/", require("./server/Routes/route"));
//wrong endpoint handling
app.use("*", (req, resp, next) => { 
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR,
            data:"No Data"
    }
    next(error);
})

//global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});
async function main() { 
    try {
        connectDB();

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();