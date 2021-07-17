const ghpages = require('gh-pages');

ghpages.publish(
  'dist',
  {
    user: {
      name: 'TIS-OMiddle',
      email: 'tis.omiddle@gmail.com',
    },
  },
  function (err) {
    console.log('err: ', err);
  },
);
