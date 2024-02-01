import prisma from "../../utils/prisma";

export async function createUser(input: CreateUserInput) {
    const user = await prisma.user.create({
        data: input,
    })
}