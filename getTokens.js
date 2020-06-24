const boxSDK = require("box-node-sdk");
const config = require("./config");

const main = async () => {
  const sdk = boxSDK.getPreconfiguredInstance(config);

  const saToken = await sdk.getEnterpriseAppAuthTokens();
  console.log(saToken);

  const USER_ID = "13094945658";
  const auToken = await sdk.getAppUserTokens(USER_ID);
  console.log(auToken);
};

main();
