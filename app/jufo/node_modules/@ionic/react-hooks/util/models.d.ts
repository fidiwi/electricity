export interface AvailableResult {
    isAvailable: boolean;
}
export declare const notAvailable: {
    isAvailable: boolean;
};
export declare class FeatureNotAvailableError extends Error {
    constructor();
}
