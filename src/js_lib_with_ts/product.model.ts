import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
/**
 * Class Transformer example
 */
export class Product {
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
