import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineTextFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {vscodeExtensionsFile, vscodeSettingsFile} from './vscode';

export const editorconfigFile = defineTextFile(`.editorconfig`, [
  `root = true`,
]);

/** https://editorconfig.org */
export function editorconfig(): readonly (
  | FileDefinition<any>
  | FileChange<any>
)[] {
  return [
    editorconfigFile,

    mergeContent(gitIgnoreFile, [editorconfigFile.path]),

    mergeContent(vscodeExtensionsFile, {
      recommendations: [`editorconfig.editorconfig`],
    }),

    mergeContent(vscodeSettingsFile, {
      'editor.formatOnSave': true,
      'files.exclude': {[editorconfigFile.path]: true},
    }),
  ];
}
