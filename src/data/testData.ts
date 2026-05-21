export interface UserLoginData {
  email: string;
  password: string;
}

export const validUserLoginData: Record<string, UserLoginData> = {
    adminUser: {
        email: "admin@gmail.com",
        password: "@123456789"
    },

    studentUser: {
        email: "student@example.com",
        password: "StudentPassword123!"
    }
};