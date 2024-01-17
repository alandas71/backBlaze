const axios = require("axios");

const getUploadUrl = async (apiUrl, authToken) => {
  try {
    const response = await axios.post(
      `${apiUrl}/b2api/v2/b2_get_upload_url`,
      {
        bucketId: process.env.BUCKET_ID,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    const data = response.data;
    const uploadUrl = data.uploadUrl;

    return {
      authToken: data.authorizationToken,
      apiUrl: uploadUrl,
    };
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

module.exports = getUploadUrl;
