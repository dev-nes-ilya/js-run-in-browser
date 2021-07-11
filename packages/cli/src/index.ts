#!/user/bin/env node
import { program } from "commander";
import { serveCommand } from './commander/serve'

program.addCommand(serveCommand);

program.parse(process.argv);