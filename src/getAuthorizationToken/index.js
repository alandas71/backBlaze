const axios = require("axios");

const applicationKeyId = process.env.APPLICATION_KEY_ID;
const applicationKey = process.env.APPLICATION_KEY;
const apiAuthorizeUrl = process.env.API_AUTHORIZE_URL;

const getAuthorizationToken = async () => {
  try {
    const authString = Buffer.from(
      `${applicationKeyId}:${applicationKey}`
    ).toString("base64");

    const response = await axios.get(apiAuthorizeUrl, {
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    return {
      apiUrl: response.data.apiUrl,
      authToken: response.data.authorizationToken,
    };
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

module.exports = getAuthorizationToken;
