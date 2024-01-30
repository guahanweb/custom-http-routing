import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

export interface ServerConfig {
    port: number | null;
    host?: string | null;
}

export interface AppConfig {
    environment: string;
    logLevel: string;
    server: ServerConfig;
}

const init = function(): AppConfig {
    return {
        environment: loadFromEnv('NODE_ENV', 'development'),
        logLevel: loadFromEnv('LOG_LEVEL', 'info'),
        server: {
            port: loadFromEnv('PORT', 4000),
            host: loadFromEnv('HOST', 'localhost'),
        }
    };
}

export default init();

function loadFromEnv(key: string, defaultValue: any = null) {
    const value = process.env && process.env[key];
    return value || defaultValue;
}