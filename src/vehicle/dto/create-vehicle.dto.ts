import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {

    @IsNotEmpty()
    vehicleType:VehicleType;

    @IsNotEmpty()
    @IsNumber()
    price:number;

    @IsNotEmpty()
    @IsString()
    name:string;

}

export enum VehicleType {
    CAR = 'CAR',
    TRUCK = 'TRUCK'
}
