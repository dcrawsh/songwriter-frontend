class Category {
    constructor(category) {
    this.id = category.id;
    this.name = category.attributes.name;
      Category.all.push(this);
    }

}

Category.all = []
