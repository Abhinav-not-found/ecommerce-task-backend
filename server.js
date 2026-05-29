import chalk from "chalk";
import app from "./src/app.js";
import config from "./src/config/config.js";

const startServer = () => {
	app.listen(config.port, () => {
		console.log(chalk.bgCyan(`Server started on port: ${config.port}`));
	});
};
startServer();
