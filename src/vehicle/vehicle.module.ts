import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from './schemas/vehicle.schema';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports:[MongooseModule.forFeature([{ name: "Vehicle" , schema:VehicleSchema}])],
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {}
