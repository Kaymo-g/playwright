export interface UserLoginData {
  email: string;
  password: string;
}

export const validUserLoginData: Record<string, UserLoginData> = {
    adminUser: {
        email: "Kamo10@gmail.com",
        password: "Kamo@2026"
    },

    studentUser: {
        email: "student@example.com",
        password: "StudentPassword123!"
    }
};