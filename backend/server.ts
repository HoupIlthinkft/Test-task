import Fastify from "fastify";

const fastify  = Fastify({
    logger: true
})

fastify.listen({port: 3000, host: "0.0.0.0"}, (error, address) => {
    if (error) {
        fastify.log.error(error)
        process.exit(1)
    } 
    fastify.log.info(`server starting and listening on ${address}`)
})