import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineJsonFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {prettierIgnoreFile} from './prettier';
import {vscodeSettingsFile} from './vscode';

export const jestConfigFile = defineJsonFile(`jest.config.json`, {});

/** https://jestjs.io */
export function jest(): readonly (FileDefinition<any> | FileChange<any>)[] {
  return [
    jestConfigFile,

    mergeContent(gitIgnoreFile, [jestConfigFile.path]),
    mergeContent(prettierIgnoreFile, [jestConfigFile.path]),

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {[jestConfigFile.path]: true},
    }),
  ];
}
