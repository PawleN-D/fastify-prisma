import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt from '@fastify/jwt';
import userRoutes from "./modules/user/user.route";
import { useSchemas } from "./modules/user/user.schema";

const server = Fastify();

server.register(fjwt, {
    secret: '4rtsfxgwy97qd327t2y022q8ft832td082'
})

server.decorate(
    "auth", 
    async (request:FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (e) {
          return reply.send(e)  
        }
    }
)


server.get("/healthcheck", async () => {
    return { status: "OK" }
})

async function main(){
    for (const schema of useSchemas) {
        server.addSchema(schema)
    }
    server.register(userRoutes, { prefix: 'api/users'})

    try{
        await server.listen({ port: 3000, host: '0.0.0.0' })
        console.log(`Server ready at http://localhost:3000`)
    } catch(e){
        console.error(e)
        process.exit(1)
    }
}

main()