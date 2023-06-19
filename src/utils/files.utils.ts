export const saveInJson = (data: any, name: string) => {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, `../storage/${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data));
};
