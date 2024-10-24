import { SynthOutput, synthSnapshot } from 'projen/lib/util/synth';
import { GitHubActionProject, GitHubActionProjectOptions } from '../src';
import { projenScripts, type ProjenScript } from '../src/types/types';

describe('GitHubActionProject', (): void => {
  let props: GitHubActionProjectOptions;
  let snapshot: SynthOutput;

  beforeEach((): void => {
    props = {
      name: 'my-github-action',
      defaultReleaseBranch: 'main',
    };

    snapshot = [];
  });

  test('Project name is set properly', (): void => {
    // GIVEN
    const project = new GitHubActionProject(props);

    // WHEN
    snapshot = synthSnapshot(project);

    // THEN
    expect(snapshot['package.json']!.name).toBe(
      'my-github-action',
    );
  });

  test('Standard npm tasks are removed when provided', (): void => {
    // GIVEN
    const scriptsToRemove: ProjenScript[] = projenScripts;
    const project = new GitHubActionProject({ ...props, scriptsToRemove });


    // WHEN
    snapshot = synthSnapshot(project);

    //THEN
    const keys: string[] = Object.keys(snapshot['package.json']?.scripts);
    const keyFound: boolean = keys.some((key: string): boolean => scriptsToRemove.includes(key as ProjenScript));
    expect(keyFound).toBe(false);
  });

  test('Standard npm tasks are removed when not provided', (): void => {
    // GIVEN
    const scriptsToRemove: ProjenScript[] = projenScripts;
    const project = new GitHubActionProject(props);

    // WHEN
    snapshot = synthSnapshot(project);

    //THEN
    const keys: string[] = Object.keys(snapshot['package.json']?.scripts);
    const keyFound: boolean = keys.some((key: string): boolean => scriptsToRemove.includes(key as ProjenScript));
    expect(keyFound).toBe(false);
  });

  test('Standard npm tasks are not fully removed when partially provided', (): void => {
    // GIVEN
    const scriptsToRemove: ProjenScript[] = ['bump', 'clobber'];
    const project = new GitHubActionProject({ ...props, scriptsToRemove });

    // WHEN
    snapshot = synthSnapshot(project);

    //THEN
    const keys: string[] = Object.keys(snapshot['package.json']?.scripts);
    const keyFound: boolean = keys.some((key: string): boolean => scriptsToRemove.includes(key as ProjenScript));
    expect(keyFound).toBe(false);
  });

  // test('PR template is prMention when not provided', (): void => {
  //   // GIVEN
  //   const project = new GitHubActionProject({
  //     name: 'my-abs-terraform',
  //     defaultReleaseBranch: 'main',
  //   });

  //   // WHEN
  //   const snapshot: SynthOutput = synthSnapshot(project);

  //   // THEN
  //   expect(snapshot['.github/pull_request_template.md']).toBe(
  //     [
  //       '### What does this PR change?',
  //       '<!--- Describe your changes in detail -->',
  //     ].join('\n'),
  //   );
  // });

  // test('PR template is created when is provided', (): void => {
  //   // GIVEN
  //   const project = new GitHubActionProject({
  //     name: 'my-abs-terraform',
  //     defaultReleaseBranch: 'main',
  //     prMention: 'someone',
  //   });

  //   // WHEN
  //   const snapshot: SynthOutput = synthSnapshot(project);

  //   // THEN
  //   expect(snapshot['.github/pull_request_template.md']).toBe(
  //     [
  //       '### What does this PR change?',
  //       '<!--- Describe your changes in detail -->',
  //       'cc @someone',
  //     ].join('\n'),
  //   );
  // });

  // test('PR template doesn\'t double @@', (): void => {
  //   // GIVEN
  //   const project = new GitHubActionProject({
  //     name: 'my-abs-terraform',
  //     defaultReleaseBranch: 'main',
  //     prMention: '@someoone',
  //   });

  //   // WHEN
  //   const snapshot: SynthOutput = synthSnapshot(project);

  //   // THEN
  //   expect(snapshot['.github/pull_request_template.md']).toBe(
  //     [
  //       '### What does this PR change?',
  //       '<!--- Describe your changes in detail -->',
  //       'cc @someoone',
  //     ].join('\n'),
  //   );
  // });
});