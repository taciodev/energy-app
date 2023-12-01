import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register.controller";
import { authenticate } from "./controllers/users/authenticate.controller";
import { create } from "./controllers/electronic-devices/create";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.post("/device", create);

}