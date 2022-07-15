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
    ],
  },

  withHook: {
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

  nextjs: {
    items: [
      {
        name: '${fileName}.tsx',
        type: 'file',
        location: 'nextjs/main.txt',
      },
      {
        name: '${fileName}.module.css',
        type: 'file',
        location: 'nextjs/styles.txt',
      },
      {
        name: 'index.ts',
        type: 'file',
        location: 'nextjs/index.txt',
      },
      {
        name: 'types.ts',
        type: 'file',
        location: 'nextjs/types.txt',
      },
      {
        name: 'hooks.ts',
        type: 'file',
        location: 'nextjs/hooks.txt',
      },
    ],
  },
};
