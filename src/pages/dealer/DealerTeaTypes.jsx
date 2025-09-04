import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DealerTeaTypes.css";
import "../../components/DealerNavbar";

export default function DealerTeaTypes() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [teaTypes, setTeaTypes] = useState([]);

  // Fetch tea types from backend API
  useEffect(() => {
    const fetchTeaTypes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tea-types");
        const data = await response.json();
        setTeaTypes(data);
      } catch (err) {
        console.error("Error fetching tea types:", err);
      }
    };

    fetchTeaTypes();
  }, []);

  const filteredTeas = teaTypes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="browse-container">
      <h2 className="browse-title">Browse Tea Types</h2>

      <input
        className="search-input"
        type="text"
        placeholder="Search tea types..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="tea-grid">
        {filteredTeas.length === 0 ? (
          <p>No tea types found.</p>
        ) : (
          filteredTeas.map((tea) => (
            <div key={tea.id} className="tea-card">
              <span>{tea.name}</span>
              <button
                className="btn-primary"
                onClick={() => navigate(`/dealers/factories/${tea.name}`)}
              >
                View Factories
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
