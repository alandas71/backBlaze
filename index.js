require("dotenv").config();
const getAuthorizationToken = require("./src/getAuthorizationToken");
const getUploadUrl = require("./src/getUploadUrl");

const uploadFotos = async () => {
  const data = await getAuthorizationToken();
  const uploadData = await getUploadUrl(data.apiUrl, data.authToken);

  const apiUploadUrl = uploadData.apiUrl;
  const authUploadToken = uploadData.authToken;
};

uploadFotos();
