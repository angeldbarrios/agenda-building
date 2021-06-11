import bootstrap from './lib/infrastructure/config/bootstrap';
import initServer from './lib/infrastructure/webserver/server';
import chalk from 'chalk';

// Errores no capturados de la aplicación
process.on('uncaughtException', (error) => {
  console.error(`uncaughtException: ${error.stack}`);
  console.error(chalk.bold.red('EXCEPCIÓN NO CAPTURADA'));
  console.error(chalk.bold.red('TERMINANDO PROCESO'));
  console.error(error);
  process.exit();
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(`unhandledRejection: ${reason}`);
  console.log(chalk.bold.red('PROMESA NO CAPTURADA'));
});

// Start the server
const start = async () => {
  try {
    const appContext = await bootstrap.init();
    const server = await initServer(appContext);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();