import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './schemas/vehicle.schema';
import { uuid } from 'uuidv4';

@Injectable()
export class VehicleService {

  constructor(@InjectModel("Vehicle") private vehicleModel: Model<Vehicle>) {}

  async create(createVehicleDto: CreateVehicleDto) : Promise<Vehicle>{

    const {vehicleType,price,name} = createVehicleDto;

    const data : Vehicle = {
        id: uuid(),
        vehicleType,
        price,
        name,
        prodDate:new Date()
    }
    

    const vehicleModel = new this.vehicleModel(data)
    return vehicleModel.save();
  }

  async findAll() : Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async getSum(arr:Vehicle[]) : Promise<number> {
    let sum = 0;
    arr.forEach((vehicle : Vehicle) => {
        sum += vehicle.price;
    })
    return sum;
  }

  async getAvgCarPrice() {
    const records = await this.vehicleModel.find().exec();
    const avg = (await this.getSum(records)) / records.length;
    return avg;
  }

  async getVehicleProduceAfterGivenDate(date:Date) {
    const records = await this.vehicleModel.find().exec();
    let vehicles = [];
    records.filter((record) => {
        if(new Date(record.prodDate) > new Date(date))
        vehicles.push(record)
    });
    return vehicles;
  }

  async findOne(id: string) : Promise<Vehicle> {

    const found = await this.vehicleModel.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Vehicle with ID "${id}" not found`);
    }

    return found;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) : Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findOne({ where: { id } }).exec();

    vehicle.name = updateVehicleDto.name;
    vehicle.price = updateVehicleDto.price;

    return vehicle.save();
  }

  async remove(id: number) {
    const vehicle = await this.vehicleModel.deleteOne({ where: { id } });
    
    if(vehicle.acknowledged)
    return `#${id} vehicle removed`;
    else
    return `Vehicle with ID "${id}" not found`;
  }
}
