import { Plant } from '../plants/plant.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    DEVELOPER = "developer"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    plants: Plant[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
