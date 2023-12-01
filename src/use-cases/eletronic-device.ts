import { ElectronicDeviceRepository } from '@/repositories/electronic-devices-repository'
import { ElectronicDevice } from '@prisma/client'

interface ElectronicDeviceUseCaseRequest {
  userId: string
  device: string
  watts: number
}

interface ElectronicDeviceUseCaseResponse {
    electronicDevice: ElectronicDevice
}

export class ElectronicDeviceUseCase {
  constructor(private electronicDeviceRepository: ElectronicDeviceRepository) {}

  async execute({ 
    userId,
    device,
    watts,
  }: ElectronicDeviceUseCaseRequest): Promise<ElectronicDeviceUseCaseResponse>{
    const electronicDevice = await this.electronicDeviceRepository.create({
      user_id: userId,
      device,
      watts,
    })

    return {
        electronicDevice,
    }
  }
}
