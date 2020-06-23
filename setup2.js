const boxSDK = require("box-node-sdk");
const config = require("./config");
const axios = require("axios");
const fs = require("fs");

const USER_ID = "13094945658";
const FILE_ID = "682313483796";

const main = async () => {
  try {
    // 作成済みのJWT認証用のConfigファイルを読み込む
    const sdk = await boxSDK.getPreconfiguredInstance(config);
    // ServiceAccountのClientオブジェクトを作成
    const saClient = sdk.getAppAuthClient("enterprise");

    const appUser = await saClient.users.update(USER_ID, {
      external_app_user_id: "hkobayashi@box.com",
    });

    console.log(appUser);
  } catch (e) {
    console.error(e.toString());
  }
};

main();
