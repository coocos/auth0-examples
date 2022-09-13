type Item = {
  name: string;
};

const items: Item[] = [
  {
    name: "example item",
  },
  {
    name: "second item",
  },
];

// async only for demonstration purposes
export async function addItem(item: Item) {
  items.push(item);
}

// async only for demonstration purposes
export async function readItems(): Promise<Item[]> {
  return items;
}
