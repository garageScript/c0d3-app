export function verifyToken(url: any): Promise<false | {
    isTokenValid: any;
    cliToken: any;
}>;
export function askCredentials(): Promise<any>;
export function getToken(credentials: any, url: any): Promise<any>;
export function saveToken(cliToken: any): Promise<void>;
