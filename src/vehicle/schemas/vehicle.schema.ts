import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { VehicleType } from '../dto/create-vehicle.dto';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  
  @Prop()
  id: string;

  @Prop()
  vehicleType: VehicleType;

  @Prop()
  price: number;

  @Prop()
  name: string;

  @Prop()
  prodDate: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle)
