import { execSync } from 'child_process';

const MIN = 1024;
const MAX = 65535;

function getRandomPort() {
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
}

function isPortFree(port: number): boolean {
    try {
        execSync(`ss -tuplen | grep ${port}`, { stdio: 'inherit' });
        return false;
    } catch {
        return true;
    }
}

function findFreePort() {
    for (let i = 0; i < 100; i++) {
        const port = getRandomPort();
        if (isPortFree(port)) return port;
    }
    throw new Error('No free port found, try again');
}

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        const port = findFreePort();
        console.log(port);
    } else if (args.length === 1) {
        const port = Number(args[0]);

        if (isPortFree(port)) {
            console.log(`port ${port} is free`);
        } else {
            console.log(`port ${port} is occupied`);
        }
    } else {
        console.log('Invalid number of parameters provided.');
        process.exit(1);
    }
}

main();
