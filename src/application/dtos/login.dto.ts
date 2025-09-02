export interface LoginRequestDto {
    username: string,
    password: String
}

export interface LoginResponseDto {
    token: string,
    user: {
        id: number,
        username: string,
        password: string
    }
}