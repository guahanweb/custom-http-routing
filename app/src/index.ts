import config from "./config";
import logger from "./logger";
import { createServer } from "./server";
import { default as express, Request, Response, NextFunction } from "express";

if (require.main === module) {
    // called directly, so execute
    main();
}

const identifyUpstreamDomain = () => (req: Request, res: Response, next: NextFunction) => {
    const original_domain = req.get('x-original-domain');
    res.locals.original_domain = original_domain || 'unknown';
    next();
};

export async function main() {
    const app = await createServer();
    const { port } = config.server;

    app.use(identifyUpstreamDomain());

    app.get('/', (req, res) => {
        res.send({
            ok: true,
            original_domain: res.locals.original_domain,
        });
    });

    /*
    if (config.environment === 'production') {
        // for prod, we mount React into the public folder
        app.use(express.static(__dirname + '/public'));
        logger.info('serving static content from ./public/');
    } else {
        // for dev, set up cors for React proxy
        app.use(function (req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    */

    app.listen(port);
    logger.info('server is listening', { port });
}