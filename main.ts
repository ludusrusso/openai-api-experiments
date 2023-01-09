import { OpenAIApi, Configuration } from "openai";
import * as fs from "fs";
import axios from "axios";
import path from "path";

const token = "<YOUR TOKEN HERE>";

const config = new Configuration({
  apiKey: token,
});

const api = new OpenAIApi(config);

async function main() {
  const imgPath = "./mimmo.png";
  const maskPath = "./mask-mimmo.png";
  const prompt = "A picture of a cat paited by picasso with cubism style";

  try {
    const image = fs.createReadStream(imgPath);
    const mask = fs.createReadStream(maskPath);
    const response = await api.createImageEdit(
      image as any,
      mask as any,
      prompt,
      2,
      "512x512"
    );

    const image_url = response.data.data[0].url;
    console.log(image_url);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    } else {
      console.log(JSON.stringify(err, null, 2));
    }
  }
}

main().then(() => console.log("done"));
