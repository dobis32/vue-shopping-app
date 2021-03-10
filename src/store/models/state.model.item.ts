export default class Item {
    private name: string;
    private price: number;
    private category: string;
  
    constructor(name: string, price: number, category: string) {
      this.name = name;
      this.category = category
      this.price = price;
    }
  
    getItemName(): string {
      return this.name;
    }
  
    setItemName(name: string) {
      this.name = name;
    }

    getItemPrice(): number {
      return this.price;
    }

    setItemPrice(n: number) {
      this.price = n;
    }
  
    getItemCategory(): string {
      return this.category;
    }
  
    setItemCategory(category: string) {
      this.category = category;
    }


  }