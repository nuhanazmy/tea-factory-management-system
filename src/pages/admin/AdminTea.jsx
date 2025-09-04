import { useState } from "react";
import "../../styles/AdminTea.css";
import "../../components/AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminTea() {
  const [teaList, setTeaList] = useState([
    { id: 1, name: "Ceylon Black Tea", quality: "High", quantity: 500, price: 250 },
    { id: 2, name: "Green Tea", quality: "Medium", quantity: 300, price: 300 },
  ]);

  const [newTea, setNewTea] = useState({ name: "", quality: "", quantity: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setNewTea({ ...newTea, [e.target.name]: e.target.value });
  };

  const addOrUpdateTea = (e) => {
    e.preventDefault();
    if (!newTea.name || !newTea.quality || !newTea.quantity || !newTea.price) {
      toast.warning("⚠️ Please fill all fields.");
      return;
    }

    if (editingId !== null) {
      // Update existing tea
      setTeaList(
        teaList.map((tea) =>
          tea.id === editingId
            ? { ...tea, ...newTea, quantity: parseInt(newTea.quantity), price: parseFloat(newTea.price) }
            : tea
        )
      );
      toast.success("✅ Tea updated successfully!");
      setEditingId(null);
    } else {
      // Add new tea
      const newEntry = {
        id: teaList.length + 1,
        name: newTea.name,
        quality: newTea.quality,
        quantity: parseInt(newTea.quantity),
        price: parseFloat(newTea.price),
      };
      setTeaList([...teaList, newEntry]);
      toast.success("✅ Tea added successfully!");
    }

    setNewTea({ name: "", quality: "", quantity: "", price: "" });
  };

  const deleteTea = (id) => {
    setTeaList(teaList.filter((tea) => tea.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNewTea({ name: "", quality: "", quantity: "", price: "" });
    }
    toast.success("🗑️ Tea deleted successfully!");
  };

  const editTea = (tea) => {
    setNewTea({
      name: tea.name,
      quality: tea.quality,
      quantity: tea.quantity,
      price: tea.price,
    });
    setEditingId(tea.id);
  };

  return (
    <div className="tea-container">
      <h2 className="tea-title">Manage Tea Types</h2>

      <form className="tea-form" onSubmit={addOrUpdateTea}>
        <input
          type="text"
          name="name"
          placeholder="Tea Name"
          value={newTea.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quality"
          placeholder="Quality (High/Medium/Low)"
          value={newTea.quality}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (kg)"
          value={newTea.quantity}
          onChange={handleInputChange}
          min="0"
        />
        <input
          type="number"
          name="price"
          placeholder="Price per kg"
          value={newTea.price}
          onChange={handleInputChange}
          min="0"
          step="0.01"
        />
        <button type="submit" className="btn-primary">
          {editingId !== null ? "Update Tea" : "Add Tea"}
        </button>
      </form>

      <table className="tea-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quality</th>
            <th>Quantity (kg)</th>
            <th>Price (Rs/kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teaList.map((tea) => (
            <tr key={tea.id}>
              <td>{tea.name}</td>
              <td>{tea.quality}</td>
              <td>{tea.quantity}</td>
              <td>{tea.price.toFixed(2)}</td>
              <td className="action-buttons">
                <button className="btn-edit" onClick={() => editTea(tea)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteTea(tea.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
