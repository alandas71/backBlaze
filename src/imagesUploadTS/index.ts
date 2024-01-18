import { s3 } from "@/services/s3BackBlaze";
import multer from "multer";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const upload = multer({ storage: multer.memoryStorage() });

export default async function subirImagens(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const diretorio = "public/fotosProdutos";
    const files = fs.readdirSync(diretorio);

    try {
      for (const file of files) {
        await new Promise((resolve, reject) => {
          upload.single("produto")(req, {} as any, async (err: any) => {
            if (err) {
              return reject(err);
            }

            const caminhoArquivo = `${diretorio}/${file}`;

            // Enviar para o backblaze
            try {
              const params = {
                Bucket: process.env.AWS_BUCKET_NAME ?? "",
                Key: `fotosProdutos/${file}`,
                Body: fs.readFileSync(caminhoArquivo),
              };

              await s3.upload(params).promise();
              resolve();
            } catch (error) {
              console.log(error);
              reject(error);
            }
          });
        });
      }

      return res.status(200).json({ message: "Arquivos enviados com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro no upload do arquivo" });
    }
  }

  return null;
}
