import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ElectronicDeviceRepository } from "../electronic-devices-repository";

export class PrismaElectronicDevicesRepository implements ElectronicDeviceRepository {
    async create(data: Prisma.ElectronicDeviceUncheckedCreateInput) {
        const eletronicDevice = await prisma.electronicDevice.create({
            data
        })

        return eletronicDevice;
    }
}