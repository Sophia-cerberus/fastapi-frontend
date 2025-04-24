export type Body_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type Body_refresh_access_token = {
  refresh: string
}

export type Token = {
  userData: Record<string, any>
  access_token: string
  refresh_token: string
}

export type Refresh = {
  access_token: string
}

export type LoginAccessTokenData = {
  formData: Body_login_access_token
}

export type LoginRefreshTokenData = {
  formData: Body_refresh_access_token
}

export type LoginResponse = Token
export type RefreshResonse = Refresh


