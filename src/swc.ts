import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineJsonFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {vscodeSettingsFile} from './vscode';

export const swcConfigFile = defineJsonFile(`.swcrc`, {});

/** https://swc.rs */
export function swc(): readonly (FileDefinition<any> | FileChange<any>)[] {
  return [
    swcConfigFile,

    mergeContent(gitIgnoreFile, [swcConfigFile.path]),

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {[swcConfigFile.path]: true},
    }),
  ];
}
