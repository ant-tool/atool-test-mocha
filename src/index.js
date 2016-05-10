import { join } from 'path';
import { spawn, exec } from 'child_process';
import { platform } from 'os';
import fs from 'fs';

const cwd = process.cwd();

export default function(config) {
  const setupFile = join(__dirname, 'setup.js');
  const compiler = join(__dirname, './compiler');

  let mochaBin;
  let cmd;

  const coverageDir = join(cwd, 'coverage');
  fs.access(coverageDir, fs.R_OK, (err) => {
    if (!err) {
      exec('rm -rf ' + coverageDir);
    }
  });

  const mochaArgs = config.args.join(' ');
  if (config.coverage) {
    mochaBin = join(require.resolve('mocha'), '../bin/_mocha');
    const istanbul = join(require.resolve('istanbul'), '../lib/cli.js');
    cmd = `node ${istanbul} cover ${mochaBin} -- --compilers .:${compiler} --require ${setupFile} ${mochaArgs}`;
  } else {
    mochaBin = join(require.resolve('mocha'), '../bin/mocha');
    cmd = `${mochaBin} --compilers .:${compiler} --require ${setupFile} ${mochaArgs}`;
  }

  const command = (platform() === 'win32' ? 'cmd.exe' : 'sh');
  const args = (platform() === 'win32' ? ['/s', '/c'] : ['-c']);

  const cp = spawn(command, args.concat([cmd]), {
    stdio: 'inherit',
  });

  cp.on('exit', () => {
    if (config.coverage) {
      console.log();
      console.log('You can see more detail in coverage/lcov-report/index.html');
      console.log();
    }
  });
}
