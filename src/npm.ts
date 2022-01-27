import type {FileChange} from '@onecfg/core';
import {mergeContent} from '@onecfg/utils';
import {vscodeExtensionsFile, vscodeSettingsFile} from './vscode';

/** https://www.npmjs.com */
export function npm(): readonly FileChange<any>[] {
  return [
    mergeContent(vscodeExtensionsFile, {
      recommendations: [`eg2.vscode-npm-script`],
    }),

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {'**/node_modules': true, 'package-lock.json': true},
    }),
  ];
}
