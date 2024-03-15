import config from "./config";
import logger from "./logger";
import path from 'path';
import { createServer } from "./server";
import { default as express, Request, Response, NextFunction } from "express";
import nunjucks from 'nunjucks';
import known_domains from './_data/domains';

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

    nunjucks.configure('views', {
        autoescape: true,
        express: app,
        watch: true,
    });

    app.set('view engine', 'html');

    app.use(identifyUpstreamDomain());

    app.get('/', (req, res) => {
        const owner = known_domains[res.locals.original_domain] || undefined;
        const brandTemplate = `${owner.id}/index.html`

        if (!owner) {
            res.send('Not Found').status(404);
        } else {
            res.render(`base/index`, {
                id: owner.id,
                name: owner.name,
                baseUri: owner.baseUri,
                brandTemplate,
            }, (err: Error, html: string) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Unknown error');
                } else {
                    res.send(html);
                }
            });
        }
    });

    app.get('/test', (req, res) => {
        res.send({
            ok: true,
            original_domain: res.locals.original_domain,
        });
    });

    app.listen(port);
    logger.info('server is listening', { port });
}