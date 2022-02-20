import type {FileChange} from '@onecfg/core';
import {mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {vscodeExtensionsFile, vscodeSettingsFile} from './vscode';

/** https://www.npmjs.com */
export function npm(): readonly FileChange<any>[] {
  return [
    mergeContent(gitIgnoreFile, [`node_modules`]),

    mergeContent(vscodeExtensionsFile, {
      recommendations: [`eg2.vscode-npm-script`],
    }),

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {'**/node_modules': true, 'package-lock.json': true},
    }),
  ];
}
