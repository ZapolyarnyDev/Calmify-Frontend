export const Logger = {
    info(message: string, ...params: any[]) {
        console.info(`[INFO] ${message}`, params);
    },

    error(message: string, ...params: any[]) {
        console.info(`[ERROR] ${message}`, params);
    }
}