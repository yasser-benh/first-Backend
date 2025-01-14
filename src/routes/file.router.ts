import { Request, Router } from "express";
import { upload } from "../helpers/storage";
import fs from "fs";
import config from "config";

const router = Router();

router
  .get("/:filename", async (req, res) => {
    const { filename } = req.params;
    const file = await fs.promises.readFile("public/" + filename);
    const fileType = filename.split(".").pop();
    res
      .setHeader("Content-Type", fileType === "mp4" ? "video/mp4" : "image/png")
      .send(file);
  })
  .get("/:filename/stream", async (req, res) => {
    const { filename } = req.params;
    const stream = fs.createReadStream("public/" + filename);
    const fileType = filename.split(".").pop();
    stream.pipe(
      res.setHeader(
        "Content-Type",
        fileType === "mp4" ? "video/mp4" : "image/png"
      )
    );
  })
  .post("/", upload.single("file"), (req: Request, res: any) => {
    const { file } = req;
    const PORT = config.get<number>("port");
    return res.json({
      url: `http://localhost:${PORT}/files/${file.filename}`,
    });
  });

export default router;
