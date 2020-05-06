declare type Token = {
    cliToken: string;
    isTokenValid: boolean;
};
declare type Credential = {
    username: string;
    password: string;
};
export declare const verifyToken: (url: string) => Promise<Token>;
export declare const askCredentials: () => Promise<Credential>;
export declare const getToken: (credentials: Credential, url: string) => Promise<string>;
export declare const saveToken: (cliToken: string) => Promise<void>;
export declare const createHiddenDir: () => void;
export declare const createCredentialsFile: (cliToken: string) => Promise<void>;
export {};
