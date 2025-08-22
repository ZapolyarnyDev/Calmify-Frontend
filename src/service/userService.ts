import { api } from "@/api/api";
import type { SelfInfo } from "@/types/userTypes";

export const UserService = {
    async getSelfInfo(): Promise<SelfInfo> {
        const response = await api.get<SelfInfo>("/v0/user");
        return response.data;
    }
}