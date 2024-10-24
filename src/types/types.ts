export type ProjenScript =
  | 'bump'
  | 'clobber'
  | 'compile'
  | 'default'
  | 'eject'
  | 'eslint'
  | 'package'
  | 'post-compile'
  | 'post-upgrade'
  | 'pre-compile'
  | 'release'
  | 'test'
  | 'test:watch'
  | 'unbump'
  | 'upgrade'
  | 'watch'
  | 'projen';

export const projenScripts: ProjenScript[] = [
  'bump',
  'clobber',
  'compile',
  'default',
  'eject',
  'eslint',
  'package',
  'post-compile',
  'post-upgrade',
  'pre-compile',
  'release',
  'test',
  'test:watch',
  'unbump',
  'upgrade',
  'watch',
  'projen',
];
