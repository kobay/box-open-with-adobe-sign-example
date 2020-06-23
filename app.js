const express = require("express");
const boxSDK = require("box-node-sdk");
const config = require("./config");

const app = express();

app.set("views", ".");
app.set("view engine", "ejs");

/**
 * setup.jsで作成したファイルとユーザーを書き換える
 */
const USER_ID = "13094945658";
const FILE_ID = "682313483796";

app.get("/", async (req, res) => {
  try {
    if (!USER_ID || !FILE_ID) {
      res.send("USER_IDとFILE_IDに値をいれてください。");
      return;
    }
    const sdk = await boxSDK.getPreconfiguredInstance(config);
    // AppUserの権限でClientオブジェクトを作成
    const auClient = await sdk.getAppAuthClient("user", USER_ID);

    // トークンをダウンスコープする
    // APIリファレンスには載っていないが、UI Elementsの説明には書いてあるAPI
    // ここでは、OpenWithで必要なものと、Previewで必要なものを両方スコープにいれてトークンをダウンスコープする
    const downToken = await auClient.exchangeToken(
      ["item_execute_integration", "item_readwrite", "item_preview"],
      `https://api.box.com/2.0/files/${FILE_ID}`
    );

    // テンプレート（index.ejs）にパラメータを渡して、HTMLを返す
    res.render("index", {
      fileId: FILE_ID,
      token: downToken.accessToken,
    });
  } catch (e) {
    console.error(e.toString());
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`express started on port ${port}`);
});
