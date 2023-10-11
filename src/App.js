import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((it) => [...it, item]);
  }

  function handleDeleteItem(id) {
    setItems((it) => it.filter(i => i.id !== id));
  }



  return (
    <div className="app">
      <Logo />
      <Form toAddItem={handleAddItem} />
      <PackingList items={items} toDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🎄 Far away</h1>;
}

function Form({ toAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    setDescription("");
    setQuantity(1);
    toAddItem(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, toDeleteItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item, i) => (
          <Item item={item} toDeleteItem={toDeleteItem} key={i} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, toDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>{" "}
      <button onClick={() => toDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You hane X items on your list, and uou already packed X (X%)</em>
    </footer>
  );
}

export default App;
