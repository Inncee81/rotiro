export type RestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export interface ApiRequest {
  routeName: string; // name of matched endpoint
  pathPattern: string; // pattern path matched to
  authTokenName?: string; // optional token name
  pathName: string; // path e.g. /user/334343
  method: RestMethods; // GET etc
  valid: boolean; // is request valid e.g. all params have passed
  authTokenValue?: string;
  authenticated: boolean; // Is the request authenticated or not
  meta: any; // auth details - probably going to be generic e.g. include user stuff
  path: Record<string, ApiRequestParam>;
  body: Record<string, ApiRequestParam>;
  query: Record<string, ApiRequestParam>;
  headers: Record<string, string>;
  rawBody?: any; // raw body - assume json for now
  rawQuery?: string; // query string after ? e.g. test=case&some=other
  send: SendResponse;
  originalRequest?: any; // optional request object passed in e.g. express request/claudiajs request - This should only be used as a reference and not assumed to be present
}

export interface ApiRequestParam {
  name: string;
  value: any | any[];
  valid: boolean;
  type: string;
}

export interface RouteNamePattern {
  routeName: string;
  pattern: any;
}

export declare type SendResponse = (
  body: any,
  status?: number,
  contentType?: string,
  headers?: Record<string, string | string[]>
) => void;

export type ControlerFunc = (apiRequest: ApiRequest) => void;

export type AuthenticatorFunc = (apiRequest: ApiRequest) => Promise<boolean>;

export type DataMapperFunc = (data: any | any[]) => any | any[];

export interface ApiEndpointSchema extends RouteNamePattern {
  path: string;
  pathParams?: PathSchemaParam[];
  methods: Record<RestMethods, MethodSchema>;
}

export interface MethodSchema {
  auth?: string;
  bodyParams?: MethodSchemaParam[];
  queryParams?: MethodSchemaParam[];
  strict?: boolean;
}

export interface PathSchemaParam {
  type: string;
  name: string;
}

export interface MethodSchemaParam extends PathSchemaParam {
  array?: boolean;
  optional?: boolean;
  value?: any;
}

export interface ErrorMessage {
  statusCode: number; // http status code e.g. 403, 404
  message: string; // A friendly message that can be displayed on the front end
  errorId?: string; // Consistent code that can identify the type of error
  errorBody?: any; // Additional data that can be used by the front end to describe the error
}

export interface RouteConfig {
  path?: Record<string, string | RoutePathParameter>;
  methods: Record<string | RestMethods, RouteMethod>;
  meta?: RouteMeta;
}

export interface RoutePathParameter {
  type: string;
}

export interface RouteMethod {
  auth?: string;
  body?: Record<string, RouteParameter>;
  query?: Record<string, RouteParameter>;
  controller: ControlerFunc;
  meta?: RouteMeta;
  strict?: boolean; // only load query parameters that are defined in schema
}

export interface RouteParameter {
  type: string;
  array?: boolean;
  optional?: boolean;
  meta?: RouteMeta;
}

export interface RouteMeta {
  name: string;
  description: string;
}

export interface ApiOptions {
  custom404?: boolean;
  basePath?: string;
}

export interface RotiroMiddleware {
  sendResponse: SendResponse;
  requestDetail: RequestDetail;
}

export interface RequestDetail {
  method: string;
  url: string;
  body?: object;
  headers: Record<string, string>;
  meta?: any;
  originalRequest?: any;
}

export type RotiroMiddlewareFunc = (
  apiRequest: ApiRequest,
  apiResponse?: ApiResponse
) => void;

export interface ApiResponse {
  body: string;
  statusCode: number;
  contentType: string;
  headers: Record<string, string | string[]>;
}
