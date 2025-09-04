import  { useState } from "react";
import "../styles/TeaTypes.css";

export default function TeaTypes() {
  const [teaTypes, setTeaTypes] = useState([
    { id: 1, name: "BOPF" },
    { id: 2, name: "Dust" },
  ]);
  const [newType, setNewType] = useState("");

  const handleAdd = () => {
    if (!newType.trim()) return;
    const newEntry = { id: Date.now(), name: newType };
    setTeaTypes([...teaTypes, newEntry]);
    setNewType("");
  };

  const handleDelete = (id) => {
    setTeaTypes(teaTypes.filter((type) => type.id !== id));
  };

  return (
    <div className="tea-container">
      <h2 className="tea-title">Manage Tea Types</h2>

      <div className="tea-form">
        <input
          type="text"
          placeholder="Enter new tea type"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        />
        <button onClick={handleAdd} className="btn-primary">Add Tea Type</button>
      </div>

      <div className="tea-list">
        {teaTypes.length === 0 ? (
          <p>No tea types available.</p>
        ) : (
          teaTypes.map((type) => (
            <div key={type.id} className="tea-card">
              <span>{type.name}</span>
              <button onClick={() => handleDelete(type.id)} className="btn-outline">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
