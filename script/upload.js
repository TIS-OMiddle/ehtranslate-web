const path = require('path');
const { parsed: env } = require('dotenv-flow').config();
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  host: env.HOST_DOMIAN,
  user: env.HOST_USERNAME,
  password: env.HOST_PASSWORD,
  port: 21,
  localRoot: path.resolve('./dist'),
  remoteRoot: '/web',
  include: ['*', '**/*'], // this would upload everything except dot files
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: ['**/*.map'],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: true,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then(res => console.log('finished:', res))
  .catch(err => console.log(err));
