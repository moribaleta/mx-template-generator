module.exports = {
  template: {
    post_execute: '',
    items: [
      {
        name: '${fileName}.tsx',
        type: 'file',
        location: 'react-native/main.txt',
      },
      {
        name: 'styles.ts',
        type: 'file',
        location: 'react-native/styles.txt',
      },
      {
        name: 'index.ts',
        type: 'file',
        location: 'react-native/index.txt',
      },
      {
        name: 'types.ts',
        type: 'file',
        location: 'react-native/types.txt',
      },
    ],
  },

  withStorybook: {
    items: [
      {
        name: 'storybook',
        type: 'folder',
        files: [
          {
            name: '${fileName}.stories.tsx',
            type: 'file',
            location: 'react-native/storybook.txt',
          },
        ],
      },
      {
        name: '${fileName}.tsx',
        type: 'file',
        location: 'react-native/main.txt',
      },
      {
        name: 'styles.ts',
        type: 'file',
        location: 'react-native/styles.txt',
      },
      {
        name: 'index.ts',
        type: 'file',
        location: 'react-native/index.txt',
      },
      {
        name: 'types.ts',
        type: 'file',
        location: 'react-native/types.txt',
      },
    ],
  },

  withHook: {
    post_execute: '',
    items: [
      {
        name: '${fileName}.tsx',
        type: 'file',
        location: 'react-native/main.txt',
      },
      {
        name: 'styles.ts',
        type: 'file',
        location: 'react-native/styles.txt',
      },
      {
        name: 'index.ts',
        type: 'file',
        location: 'react-native/index.txt',
      },
      {
        name: 'types.ts',
        type: 'file',
        location: 'react-native/types.txt',
      },
      {
        name: 'hooks.ts',
        type: 'file',
        location: 'react-native/hooks.txt',
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
