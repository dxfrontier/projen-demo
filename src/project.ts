import { javascript } from 'projen';
// import { projenScripts, type ProjenScript } from './types/types';
import { projenScripts, type ProjenScript } from './types/types';
// import { PullRequestTemplate } from 'projen/lib/github';
import { TypeScriptProject, TypeScriptProjectOptions } from 'projen/lib/typescript';

export interface GitHubActionProjectOptions extends TypeScriptProjectOptions {
  // /**
  //  * Defines a specific user to be mentioned
  //  * @default ''
  //  */
  // readonly prMention?: string;

  /**
   * Defines the standard Projen NPM scripts to be removed on instantiation
   * @default ProjenScript[]
   */
  readonly scriptsToRemove?: ProjenScript[];
}

export class GitHubActionProject extends TypeScriptProject {
  constructor(options: GitHubActionProjectOptions) {
    const {
      scriptsToRemove,
      ...restOptions
    } = options;

    const updatedOptions: GitHubActionProjectOptions = {
      ...restOptions,
      scriptsToRemove: scriptsToRemove ?? projenScripts,
      packageManager: javascript.NodePackageManager.NPM,
      minNodeVersion: '20',
      devDeps: [
        'projen-repo@github:dxfrontier/projen-template-github-action',
      ],
      eslint: false,
      jest: false,
      prettier: false,
      vscode: false,
      disableTsconfigDev: true,
      github: false,
      commitGenerated: false,
      // pullRequestTemplate: false,
      // buildWorkflow: false,
      // release: false,
      // pullRequestTemplate: false,
    };

    super(updatedOptions);


    // const scriptsToRemove: ProjenScript[] = options.scriptsToRemove ?? projenScripts;
    this.removeStandardScripts(updatedOptions);


    // this.createPullRequestTemplate(options);
  }

  protected removeStandardScripts(options: GitHubActionProjectOptions): void {
    if (options.scriptsToRemove) {
      for (const script of options.scriptsToRemove) {
        this.removeScript(script);
      }
    }
  }

  // protected createPullRequestTemplate(options: GitHubActionProjectOptions): void {
  //   const lines: string[] = [
  //     '### What does this PR change?',
  //     '<!--- Describe your changes in detail -->',
  //   ];

  //   if (options.prMention) {
  //     lines.push(`cc @${options.prMention.replace('@', '')}`);
  //   }

  //   new PullRequestTemplate(this.github!, {
  //     lines: lines,
  //   });
  // }
}