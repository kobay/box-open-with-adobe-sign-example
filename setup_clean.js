const boxSDK = require("box-node-sdk");
const config = require("./adobe-sign-open-with_config.json");

const USER_ID = "13095032318";
const FILE_ID = "682313395161";

const main = async () => {
  try {
    // 作成済みのJWT認証用のConfigファイルを読み込む
    const sdk = await boxSDK.getPreconfiguredInstance(config);
    // ServiceAccountのClientオブジェクトを作成
    const saClient = sdk.getAppAuthClient("enterprise");

    // app userのホームフォルダに、サンプルとしてSample.docをアップロードする
    saClient.asUser(USER_ID);
    await saClient.files.delete(FILE_ID);
    saClient.asSelf();

    await saClient.users.delete(USER_ID);
    console.log("done");
  } catch (e) {
    console.error(e.toString());
  }
};

main();
