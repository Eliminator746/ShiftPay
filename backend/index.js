const express = require("express");
const app = express();

app.use(express.json());
const cors=require("cors")
app.use(cors())
//-----
 // Make sure all app.use() are above actual route. Otherwise you are screwed
//--------
const mainRouter=require("./router/index.js")
const port = 3000;



app.use("/api/v1",mainRouter)
// app.use("/api/v2",v2Router)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

//When this backend folder runs, by default index.js will run 1st as we know.
//So we are saying here, whatever req. comes in /api/v1 forward it to mainRouter.


//---------

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/password

// /api/v1/account/transferMoney
// /api/v1/account/

//------------

//express.json() : to support JSON body in POST req.
//Body-parser or express.json() : any will work

