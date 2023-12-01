import { Prisma, ElectronicDevice } from "@prisma/client";

export interface ElectronicDeviceRepository {
    create(data: Prisma.ElectronicDeviceUncheckedCreateInput): Promise<ElectronicDevice>;
}