declare  global {
    namespace Express {
        interface Request {
            user?: {
                role?: "adin" | "teacher" | "student";
            };
        }
    }
}

export {};