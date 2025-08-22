import type { ApiResponse } from "./apiResponse";

interface SelfInfoResponse {
    displayName: string,
    handle: string,
    description?: string,
}

export type SelfInfo = ApiResponse<SelfInfoResponse>;