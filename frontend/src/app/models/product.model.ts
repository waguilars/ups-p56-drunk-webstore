export interface ProductResponse {
  status: boolean;
  product: Product[];
}

export class Product {
  id: string;
  name: string;
  descShort: string;
  descLong: string;
  price: number;
  category: string;
  img: string;
  stock: number;

  constructor(obj: any) {
    this.id = obj.id || obj._id;
    this.name = obj.name;
    this.descShort = obj.descShort || obj.desc_short;
    this.descLong = obj.descLong || obj.desc_long;
    this.price = obj.price;
    this.category = obj.category;
    this.img = obj.img;
    this.stock = obj.stock;
  }
}
