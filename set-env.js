const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProd = environment === 'prod';
const targetPath = environment === 'dev'
    ? `./src/environments/environment.ts`
    : `./src/environments/environment.${environment}.ts`;

const envConfigFile = `
export const environment = {
  production: ${isProd},
  hmr: ${process.env.HMR},
  apiHost: '${process.env.API_URL}',
  apiPrefix: '${process.env.API_PREFIX}',
  adminPrefix: '${process.env.ADMIN_PREFIX}',
  attachments: '${process.env.ATTACHMENTS_PATH}'
};
`;
writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`Output generated at ${targetPath}`);
});