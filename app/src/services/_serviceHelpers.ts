import { Platform } from 'quasar'

class ServiceHelpers {
    private static readonly API_BASE_URL_LOCAL_WINDOWS = 'https://localhost:44350/'
    private static readonly API_BASE_URL_LOCAL_MAC = 'https://localhost:5001/'
    private static readonly API_BASE_URL_PRODUCTION = 'https://api.tarkovlens.com/'
    
    static getAPIBaseUrl(): string {
        if (process.env.DEV) {
            if (Platform.is.ios) {
                return this.API_BASE_URL_PRODUCTION
            }
            if (Platform.is.mac) {
                return this.API_BASE_URL_LOCAL_MAC
            }
            // Default to this in development
            return this.API_BASE_URL_LOCAL_WINDOWS
        }

        // Always use this in production
        return this.API_BASE_URL_PRODUCTION
    }
}

export default ServiceHelpers