import path from "node:path";

const extractFiles = (filenames, joiner = "") =>
  filenames
    .map((file) => path.relative(process.cwd(), file))
    .join(` ${joiner} `);

const configurations = {
  "*.{ts,tsx}": (filenames) => {
    const extractedFiles = extractFiles(filenames);

    return [
      `eslint --fix --max-warnings=0 ${extractedFiles}`,
      `next lint --file ${extractFiles(filenames, "--file")}`,
      `prettier --write ${extractedFiles}`,
    ];
  },
  "*.{json,css,md,mjs}": (filenames) =>
    `prettier --write ${extractFiles(filenames)}`,
};

export default configurations;
