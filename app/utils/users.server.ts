import { prisma } from "~/utils/prisma.server";
import { RegisterForm } from "./types.server";
import bcrypt from 'bcryptjs';

export const createUser = async (user: RegisterForm) => {
    const passwordHashed = await bcrypt.hash(user.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHashed,
            profile: {
                firstName: user.firstName,
                lastName: user.lastName,
            }
        }
    });
    return { id: newUser.id, email: user.email };
}