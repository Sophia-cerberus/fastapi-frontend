import { OpenAPI } from "@/client/core/OpenAPI"
import { request as __request } from "@/client/core/request";
import type { CancelablePromise } from "@/client/core/CancelablePromise";

import type { auth } from '@/client/types'

export class AuthService {

    public static login(
        data: auth.LoginAccessTokenData
    ): CancelablePromise<auth.LoginResponse> {
        return __request(OpenAPI, {
            method: "POST",
            url: "/sign-in",
            body: data.formData,
            mediaType: "application/json",
            errors: {
                422: "Validation Error",
            }
        })
    }

    public static refresh(
        data: auth.LoginRefreshTokenData
    ): CancelablePromise<auth.RefreshResonse> {
        return __request(OpenAPI, {
            method: "POST",
            url: "refresh-token",
            body: data.formData,
            mediaType: "application/json",
            errors: {
                422: "Validation Error",
            }
        })
    }
}