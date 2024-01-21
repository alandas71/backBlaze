require("dotenv").config();
const getAuthorizationToken = require("./src/getAuthorizationToken");
const getUploadUrl = require("./src/getUploadUrl");
const imagesUpload = require("./src/imagesUpload");

const uploadFotos = async () => {
  const data = await getAuthorizationToken();
  const uploadData = await getUploadUrl(data.apiUrl, data.authToken);
  await imagesUpload(uploadData.apiUrl, uploadData.authToken);
};

uploadFotos();
