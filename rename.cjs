const fs = require("fs");
const path = require("path");

// Folder containing your images
const folderPath = path.join(__dirname, "public", "projectsImg", "villa");

// New filename prefix
const prefix = "villa-img";

// Supported image extensions
const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"];

const files = fs
  .readdirSync(folderPath)
  .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
  .sort();

files.forEach((file, index) => {
  const ext = path.extname(file);
  const oldPath = path.join(folderPath, file);
  const newPath = path.join(folderPath, `${prefix}${index + 1}${ext}`);

  fs.renameSync(oldPath, newPath);
  console.log(`${file} → ${prefix}${index + 1}${ext}`);
});

console.log("✅ All images renamed successfully!");