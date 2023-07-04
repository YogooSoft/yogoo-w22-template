export interface MockParams {
    url: string;
    type: string;
    response(option?: any): Record<string, unknown>;
    // url: string;
    // type: string;
    // body: any;
    // headers?: { Authorization?: string };
    // query: any;
}

