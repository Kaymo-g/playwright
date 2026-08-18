import { test, expect } from '@playwright/test';
const BASE_URL = 'https://ndosisimplifiedautomation.vercel.app/#practice';

const ADMIN = {
    email: "Kamo10@gmail.com",
    password: "Kamo@2026",
};

const STUDENT = {
    email: "Kamo10@gmail.com",
    password: "Kamo@2026",
};

const COURSE_NAME = 'Testing Course';

export const validUserLoginData = {
    adminUser: ADMIN,
    studentUser: STUDENT,
};