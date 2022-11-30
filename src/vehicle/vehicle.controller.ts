import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';

@Controller('vehicle')
export class VehicleController {

  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body(ValidationPipe) createVehicleDto: CreateVehicleDto) : Promise<Vehicle> {
    console.log(createVehicleDto)
    return await this.vehicleService.create(createVehicleDto);
  }

  @Get()
  async findAll() : Promise<Vehicle[]> {
    return await this.vehicleService.findAll();
  }

  @Get('/avgPrice')
  async getAvgPrice() {
    return this.vehicleService.getAvgCarPrice();
  }

  @Get('/getVehicleProduceAfterGivenDate/:date')
  async getVehicleProduceAfterGivenDate(@Param('date') date: Date) {
    return this.vehicleService.getVehicleProduceAfterGivenDate(date);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) : Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateVehicleDto: UpdateVehicleDto) : Promise<Vehicle> {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) : Promise<string> {
    return await this.vehicleService.remove(+id);
  }

}
