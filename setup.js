const boxSDK = require("box-node-sdk");
const config = require("./config");
const axios = require("axios");
const fs = require("fs");

const main = async () => {
  try {
    const sdk = await boxSDK.getPreconfiguredInstance(config);
    const saClient = sdk.getAppAuthClient("enterprise");

    // create app user
    let appUser = await saClient.enterprise.addAppUser(
      "Adobe Sign Sample App User"
    );
    console.log(`const USER_ID = "${appUser.id}"`);

    // upload sample docx file
    saClient.asUser(appUser.id);
    const stream = fs.createReadStream("./Sample.docx");
    const files = await saClient.files.uploadFile("0", "Sample.docx", stream);
    const file = files.entries[0];
    saClient.asSelf();
    console.log(`const FILE_ID = "${file.id}"`);

    // check available integrations
    const appIntegs = await saClient.get("/app_integrations");
    console.log(appIntegs.body);
    /*
        {
          next_marker: null,
          entries: [
            { type: "app_integration", id: "10897" }, <= Edit with G Suite
            { type: "app_integration", id: "1338" }, <= Edit with desktop apps
            { type: "app_integration", id: "13418" },  <= Edit with desktop apps (SFC) Box Editの統合
            { type: "app_integration", id: "3282" }, <= Sign with Adobe Sign
          ],
          limit: 100,
        };
        */

    const saTokenInfo = await sdk.getEnterpriseAppAuthTokens();
    const saAxios = axios.create({
      baseURL: "https://api.box.com/2.0",
      headers: {
        Authorization: `Bearer ${saTokenInfo.accessToken}`,
      },
    });

    // enable all the integrations for the created app user
    for (const e of appIntegs.body.entries) {
      // const integ = await saClient.get(`/app_integrations/${e.id}`);
      // console.log(integ.body);

      await saAxios.post("/app_integration_assignments", {
        assignee: {
          type: "user",
          id: appUser.id,
        },
        app_integration: {
          type: "app_integration",
          id: e.id,
        },
      });
    }
  } catch (e) {
    console.error(e.toString());
  }
};

main();
