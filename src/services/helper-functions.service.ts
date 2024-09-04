import { Injectable } from "@nestjs/common";

@Injectable()
export class HelperFunctionsService {
    generateRandom = (min: number, max: number) => (Math.floor(Math.random() * (max - min + 1)) + min);

    generateRandomFloat = (min: number, max: number) => ((Math.random() * (max - min + 1)) + min);
}