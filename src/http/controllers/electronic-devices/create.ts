import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { PrismaElectronicDevicesRepository } from "@/repositories/prisma/prisma-electronic-devices-repository";
import { ElectronicDeviceUseCase } from "@/use-cases/eletronic-device";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createElectronicDeviceParamsSchema = z.object({
        userId: z.string().uuid(),
    })

    const createElectronicDeviceBodySchema = z.object({
        device: z.string(),
        watts: z.number(),
    });

    const { userId } = createElectronicDeviceParamsSchema.parse(request.params)
    const { device, watts } = createElectronicDeviceBodySchema.parse(request.body);

    try {
        const electronicDevicesRepository = new PrismaElectronicDevicesRepository();
        const createUseCase = new ElectronicDeviceUseCase(electronicDevicesRepository);

        await createUseCase.execute({ 
            device, 
            watts,
            userId
        });

    } catch(err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        throw err
    }

    return reply.status(201).send();
}