import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineJsonFile, defineTextFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {vscodeExtensionsFile, vscodeSettingsFile} from './vscode';

export const prettierConfigFile = defineJsonFile(`.prettierrc.json`, {});
export const prettierIgnoreFile = defineTextFile(`.prettierignore`, []);

/** https://prettier.io */
export function prettier(): readonly (FileDefinition<any> | FileChange<any>)[] {
  return [
    prettierConfigFile,
    prettierIgnoreFile,

    mergeContent(prettierIgnoreFile, [prettierConfigFile.path]),

    mergeContent(gitIgnoreFile, [
      prettierConfigFile.path,
      prettierIgnoreFile.path,
    ]),

    mergeContent(vscodeExtensionsFile, {
      recommendations: [`esbenp.prettier-vscode`],
    }),

    mergeContent(vscodeSettingsFile, {
      ...[
        `css`,
        `html`,
        `javascript`,
        `javascriptreact`,
        `json`,
        `typescript`,
        `typescriptreact`,
        `yaml`,
      ].reduce<Record<string, object>>(
        (settings, identifier) => ({
          ...settings,
          [`[${identifier}]`]: {
            'editor.defaultFormatter': `esbenp.prettier-vscode`,
          },
        }),
        {},
      ),

      'editor.formatOnSave': true,

      'files.exclude': {
        [prettierConfigFile.path]: true,
        [prettierIgnoreFile.path]: true,
      },
    }),
  ];
}
