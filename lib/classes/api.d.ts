import { Authenticators } from './authenticators';
import { Controllers } from './controllers';
import { Endpoints } from './endpoints';
import { Mappers } from './mappers';
import { Routes } from './routes';
export declare class Api {
    get controllers(): Controllers;
    get routes(): Routes;
    get endpoints(): Endpoints;
    get mappers(): Mappers;
    get authenticators(): Authenticators;
    get locked(): boolean;
    static create(basePath?: string): Api;
    private static extractRequestDetails;
    private readonly _routes;
    private readonly _authenticators;
    private readonly _endpoints;
    private readonly _controllers;
    private readonly _mappers;
    private readonly basePath;
    private _locked;
    private constructor();
    build(): void;
    router(): (request: any, response: any) => Promise<void>;
    private sendError;
}
//# sourceMappingURL=api.d.ts.map