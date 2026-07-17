import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesFolder = path.join(__dirname, "../src/assets/games");
const outputFile = path.join(__dirname, "../src/assets/gameImages.js");

const files = fs
  .readdirSync(gamesFolder)
  .filter((file) => /\.(png|jpg|jpeg|webp|svg)$/i.test(file));

let imports = "";
let exportsText = "const gameImages = {\n";

for (const file of files) {
  const key = path.parse(file).name;
  const variable = key.replace(/[^a-zA-Z0-9]/g, "_");

  imports += `import ${variable} from "./games/${file}";\n`;
  exportsText += `  "${key}": ${variable},\n`;
}

exportsText += "};\n\nexport default gameImages;\n";

fs.writeFileSync(outputFile, imports + "\n" + exportsText);

console.log("✅ gameImages.js generated successfully!");