// @ts-check

const clebert = require(`@onecfg/clebert`);
const defaults = require(`@onecfg/defaults`);
const {onecfg} = require(`onecfg`);

const nodeVersion = `16`;
const target = `es2021`;

onecfg(
  ...defaults.editorconfig(),
  ...defaults.eslint(),
  ...defaults.git(),
  ...defaults.node({version: nodeVersion}),
  ...defaults.npm(),
  ...defaults.prettier(),
  ...defaults.typescript(),
  ...defaults.vscode({showFilesInEditor: false}),

  ...clebert.editorconfig(),
  ...clebert.eslint({env: {[target]: true}}),
  ...clebert.github({nodeVersion}),
  ...clebert.prettier(),

  ...clebert.typescript({
    module: `CommonJS`,
    declaration: true,
    outDir: `lib`,
    sourceMap: true,
    lib: [target],
    target,
  }),
);
