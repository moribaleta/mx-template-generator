module.exports = {
  template: {
    post_execute: '',
    items: [
      {
        name: '${fileName}.tsx',
        type: 'file',
        location: 'main.txt',
      },
      {
        name: 'styles.ts',
        type: 'file',
        location: 'styles.txt',
      },
      {
        name: 'index.ts',
        type: 'file',
        location: 'index.txt',
      },
      {
        name: 'types.ts',
        type: 'file',
        location: 'types.txt',
      },
      {
        name: 'hooks.ts',
        type: 'file',
        location: 'hooks.txt',
      },
    ],
  },
};
