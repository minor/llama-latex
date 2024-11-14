<div align="center">
  <div>
    <h1 align="center">Llama Latex</h1>
  </div>
	<p>An npm library to convert images into LaTeX for free with Llama 3.2 Vision.</p>

<a href="https://www.npmjs.com/package/llama-latex"><img src="https://img.shields.io/npm/v/llama-latex" alt="Current version"></a>

</div>

---

## Installation

`npm i llama-latex`

## Usage

```js
import { img2latex } from "llama-ocr";

const latex = await img2latex({
  filePath: "./test/maxwell_distribution.png",, // path to your image
  apiKey: process.env.TOGETHER_API_KEY, // Together AI API key
});
```

## Credit

This project was inspired by @nutlope's [llama-ocr](https://github.com/Nutlope/llama-ocr). Go check them out!
