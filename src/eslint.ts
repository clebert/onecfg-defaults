import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineJsonFile, defineTextFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {prettierIgnoreFile} from './prettier';
import {vscodeExtensionsFile, vscodeSettingsFile} from './vscode';

export const eslintConfigFile = defineJsonFile(`.eslintrc.json`, {root: true});
export const eslintIgnoreFile = defineTextFile(`.eslintignore`, []);

/** https://eslint.org */
export function eslint(): readonly (FileDefinition<any> | FileChange<any>)[] {
  return [
    eslintConfigFile,
    eslintIgnoreFile,

    mergeContent(gitIgnoreFile, [eslintConfigFile.path, eslintIgnoreFile.path]),
    mergeContent(prettierIgnoreFile, [eslintConfigFile.path]),

    mergeContent(vscodeExtensionsFile, {
      recommendations: [`dbaeumer.vscode-eslint`],
    }),

    mergeContent(vscodeSettingsFile, {
      'editor.codeActionsOnSave': {'source.fixAll.eslint': true},
      'files.exclude': {
        [eslintConfigFile.path]: true,
        [eslintIgnoreFile.path]: true,
      },
    }),
  ];
}
