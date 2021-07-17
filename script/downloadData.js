const download = require('download');

(async () => {
  await download('https://raw.fastgit.org/EhTagTranslation/DatabaseReleases/master/db.full.json', './data', {
    filename: 'db.full.json',
  });
})();
