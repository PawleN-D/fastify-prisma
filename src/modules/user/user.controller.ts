import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput;
    }>, 
    reply: FastifyReply
) {
    
    const body = request.body;
    console.log(body)

    try{
        const user = await createUser(body);
        console.log(user)
        return reply.code(201).send(user);
    } catch(e) {
        console.log(e);
        return reply.code(500).send(e)
    }
}

export async function loginHandler(
    request: FastifyRequest, 
    reply: FastifyReply
){

}