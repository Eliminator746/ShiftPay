import express from "express";
import cors from "cors";

// Initialize the Express app
const app = express();

app.use(express.json());

app.use(cors());

//------------------------------------------------------------
//              Route handlers
//------------------------------------------------------------

import rootRouter from "./router/index.js";

const port = 3000;

app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;

// When this backend folder runs, index.js will run 1st
// So we are saying here, whatever req. comes in /api/v1 forward it to rootRouter .
