export interface LogInForm{
    title: string
    formData: {
        username: string
        passord: string
    }
}

export interface SignUpForm{
    title: string
    formData: {
        username: string
        age: number
        password: string
    }
}