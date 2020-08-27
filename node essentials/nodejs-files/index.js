const fs = require("fs").promises;

async function main() {}

main();

async function findSalesFiles(folderName) {
  // this array will hold sales files as they are found
  let salesFiles = [];

  async function findFiles(folderName) {
    // read all the items in the current folder
    const items = await fs.readdir(folderName, { withFileTypes: true });

    // iterate over each found item
    for (item of items) {
      if (item.isDirectory()) {
        // search this directory for files (this is recursion!)
        await findFiles(`${folderName}/${item.name}`);
      } else {
        // Make sure the discovered file is a sales.json file
        if (item.name === "sales.json") {
          // store the file path in the salesFiles array
          salesFiles.push(`${folderName}/${item.name}`);
        }
      }
    }
  }
  await findFiles(folderName);
  return salesFiles;
}
async function main() {
  const salesFiles = await findSalesFiles("stores");
  console.log(salesFiles);
}
main();