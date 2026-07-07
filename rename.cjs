const fs = require("fs");
const path = require("path");
let Jimp = require("jimp");

// Automatically handle Jimp version differences (v0.x vs v1.x)
if (!Jimp.read && Jimp.Jimp) {
  Jimp = Jimp.Jimp;
}

// Folder containing your images
const folderPath = path.join(__dirname, "public", "projectsImg", "Rajapushpa");

// Create an output directory
const outputPath = path.join(folderPath, "converted");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

// New filename prefix
const prefix = "RP-img";

// Supported image extensions
const imageExtensions = [".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".gif", ".webp"];

const files = fs
  .readdirSync(folderPath)
  .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
  .sort();

async function convertAndCompress() {
  if (!Jimp || typeof Jimp.read !== "function") {
    console.error("❌ Critical Error: Jimp library could not be loaded properly.");
    return;
  }

  console.log(`Found ${files.length} images. Starting compression using Jimp...`);

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const oldPath = path.join(folderPath, file);
    
    // Save as highly compressed JPG to drastically reduce size
    const newFileName = `${prefix}${index + 1}.jpg`;
    const newPath = path.join(outputPath, newFileName);

    try {
      // Read the image safely
      const image = await Jimp.read(oldPath);
      
      // Compress and save (Quality 60 handles size reduction beautifully)
      if (typeof image.quality === "function") {
        image.quality(60);
      }
      
      // Handle both modern .write() and legacy .writeAsync()
      if (typeof image.writeAsync === "function") {
        await image.writeAsync(newPath);
      } else {
        await image.write(newPath);
      }

      console.log(`✅ ${file} → ${newFileName}`);
    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }

  console.log(`🎉 All images compressed and renamed successfully!`);
  console.log(`📂 Check the folder: ${outputPath}`);
}

convertAndCompress();