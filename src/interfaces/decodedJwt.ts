export interface DecodedJwt {
    email: string,
    name: string,
    city: string,
    avatar: string,
    userId: string,
    iat: number,
    exp: number
}