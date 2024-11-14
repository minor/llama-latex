import { img2latex } from "../src/index";

async function main() {
  let latex = await img2latex({
    // filePath:
    //   "https://wikimedia.org/api/rest_v1/media/math/render/svg/b10c7a4e4247d08b4c4dce5c2202153a8000d6f8",
    filePath: "./test/maxwell_distribution.png",
    apiKey: process.env.TOGETHER_API_KEY,
  });

  console.log(latex);
}

main();