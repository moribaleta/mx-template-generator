module.exports = {
  template: {
    post_execute: '',
    items: [
      {
        name: 'src',
        type: 'folder',
        files: [
          {
            name: 'types.ts',
            type: 'file',
            location: 'types.txt',
          },
          {
            name: 'styles',
            type: 'folder',
            files: [
              {
                name: 'styles.ts',
                type: 'file',
                location: 'styles.txt',
              },
            ],
          },
        ],
      },
      {
        name: '${fileName}.tsx',
        type: 'file',
        location: 'main.txt',
      },
    ],
  },
};
