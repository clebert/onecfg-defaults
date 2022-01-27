import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineTextFile, mergeContent} from '@onecfg/utils';
import {vscodeSettingsFile} from './vscode';

export const gitIgnoreFile = defineTextFile(`.gitignore`, []);

/** https://git-scm.com */
export function git(): readonly (FileDefinition<any> | FileChange<any>)[] {
  return [
    gitIgnoreFile,

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {'**/.git': true, [gitIgnoreFile.path]: true},
    }),
  ];
}
