const express = require("express");
const boxSDK = require("box-node-sdk");
const config = require("./config");

const app = express();

app.set("views", ".");
app.set("view engine", "ejs");

// setup 1
const USER_ID = "13094945658";
const FILE_ID = "682313483796";

app.get("/", async (req, res) => {
  try {
    const sdk = await boxSDK.getPreconfiguredInstance(config);

    // use bare token
    const userToken = await sdk.getAppUserTokens(USER_ID);

    // const auClient = await sdk.getAppAuthClient("user", USER_ID);
    // const downToken = await auClient.exchangeToken(
    //   [
    //     "item_execute_integration",
    //     "item_readwrite",
    //     "item_preview",
    //     "root_readwrite",
    //   ],
    //   `https://api.box.com/2.0/files/${FILE_ID}`
    // );

    res.render("index", {
      fileId: FILE_ID,
      // token: downToken.accessToken,
      token: userToken.accessToken,
    });
  } catch (e) {
    console.error(e.toString());
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`express started on port ${port}`);
});
