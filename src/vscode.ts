import type {FileChange, FileDefinition} from '@onecfg/core';
import {defineJsonFile, mergeContent} from '@onecfg/utils';
import {gitIgnoreFile} from './git';
import {prettierIgnoreFile} from './prettier';

export interface VscodeOptions {
  readonly showFilesInEditor?: boolean;
}

export const vscodeExtensionsFile = defineJsonFile(`.vscode/extensions.json`, {
  recommendations: [],
});

export const vscodeSettingsFile = defineJsonFile(`.vscode/settings.json`, {});

/** https://code.visualstudio.com */
export function vscode(
  options: VscodeOptions = {},
): readonly (FileDefinition<any> | FileChange<any>)[] {
  const {showFilesInEditor = false} = options;

  return [
    vscodeExtensionsFile,
    vscodeSettingsFile,

    mergeContent(gitIgnoreFile, [
      vscodeExtensionsFile.path,
      vscodeExtensionsFile.path,
    ]),

    mergeContent(prettierIgnoreFile, [
      vscodeSettingsFile.path,
      vscodeSettingsFile.path,
    ]),

    mergeContent(vscodeSettingsFile, {'files.exclude': {'**/.DS_Store': true}}),

    ...(showFilesInEditor
      ? [
          mergeContent(
            vscodeSettingsFile,
            {'files.exclude': undefined},
            {priority: 1},
          ),
        ]
      : []),
  ];
}
