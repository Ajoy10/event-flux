import { User } from '@prisma/client';

type SensitiveUserKeys = 'googleId'; // | "passwordHash"
export type UserProfile = Omit<User, 'googleId'>;
