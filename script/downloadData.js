const download = require('download');

(async () => {
  await download('https://cdn.jsdelivr.net/gh/EhTagTranslation/DatabaseReleases@master/db.full.json', './data', {
    filename: 'db.full.json',
  });
})();
