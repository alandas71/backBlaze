const axios = require("axios");

const applicationKeyId = process.env.APPLICATION_KEY_ID;
const applicationKey = process.env.APPLICATION_KEY;

const apiMethodName = "b2_authorize_account";

module.exports = async () => {
  const authRes = await axios({
    method: "GET",
    url: `https://api.backblazeb2.com/b2api/v2/${apiMethodName}`,
    auth: {
      username: applicationKeyId,
      password: applicationKey,
    },
  });

  const data = authRes.data;

  return {
    apiUrl: data.apiUrl,
    authToken: data.authorizationToken,
  };
};
