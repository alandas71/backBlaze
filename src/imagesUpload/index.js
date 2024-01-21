const fs = require("fs");
const path = require("path");
const axios = require("axios");
const crypto = require("crypto"); // Módulo para cálculo de hash SHA-1

const imagesUpload = async (apiUrl, authToken) => {
  const imagePath = "public/fotosProdutos";

  try {
    const files = fs.readdirSync(imagePath);

    for (const file of files) {
      const filePath = path.join(imagePath, file);

      if (fs.statSync(filePath).isFile()) {
        const fileContent = fs.readFileSync(filePath);

        // Calcular o hash SHA-1 do conteúdo do arquivo
        const sha1 = crypto.createHash("sha1");
        sha1.update(fileContent);
        const sha1Hash = sha1.digest("hex");

        // Configurar cabeçalhos para o upload
        const headers = {
          Authorization: authToken,
          "X-Bz-File-Name": file,
          "X-Bz-Content-Sha1": sha1Hash, // Adicionar o hash SHA-1
          "Content-Type": "b2/auto",
        };

        const response = await axios.post(apiUrl, fileContent, { headers });

        if (response.status === 200) {
          console.log(`Upload bem-sucedido para ${file}`);
        } else {
          console.error(
            `Falha no upload para ${file}. Status: ${response.status}, Mensagem: ${response.data}`
          );
        }
      }
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
};

module.exports = imagesUpload;
