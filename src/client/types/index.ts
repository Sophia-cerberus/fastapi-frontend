export * as auth from './auth.gen'

export type HTTPValidationError = {
    detail?: Array<ValidationError>
}

export type ValidationError = {
    loc: Array<string | number>
    msg: string
    type: string
}


  