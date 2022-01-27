import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineTextFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {vscodeSettingsFile} from './vscode';

export interface NodeOptions {
  readonly version: string;
}

export const nodeVersionFile = defineTextFile(`.node-version`, []);

/** https://nodejs.org */
export function node(
  options: NodeOptions,
): readonly (FileDefinition<any> | FileChange<any>)[] {
  const {version} = options;

  return [
    nodeVersionFile,

    mergeContent(gitIgnoreFile, [nodeVersionFile.path]),
    mergeContent(nodeVersionFile, [version], {priority: -1}),

    mergeContent(vscodeSettingsFile, {
      'files.exclude': {[nodeVersionFile.path]: true},
    }),
  ];
}
