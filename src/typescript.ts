import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineJsonFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {prettierIgnoreFile} from './prettier';
import {vscodeSettingsFile} from './vscode';

export const typescriptConfigFile = defineJsonFile(`tsconfig.json`, {});

/** https://www.typescriptlang.org */
export function typescript(): readonly (
  | FileDefinition<any>
  | FileChange<any>
)[] {
  return [
    typescriptConfigFile,

    mergeContent(gitIgnoreFile, [typescriptConfigFile.path]),
    mergeContent(prettierIgnoreFile, [typescriptConfigFile.path]),

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {[typescriptConfigFile.path]: true},
      'typescript.tsdk': `node_modules/typescript/lib`,
    }),
  ];
}
