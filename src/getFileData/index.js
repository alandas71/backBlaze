const getFileData = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/file/${bucketName}/produtos/product.jpg`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
