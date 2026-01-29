import { useEffect, useState } from "react";
import {
  getTrustedPeople,
  addTrustedPerson,
  deleteTrustedPerson,
} from "../../services/trustedPeopleService";

export default function TrustedPeople() {
  const [people, setPeople] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    relation: "",
  });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const loadPeople = async () => {
    const data = await getTrustedPeople();
    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      setError("");
      setMessage("");

      await addTrustedPerson(form);
      setForm({ name: "", email: "", relation: "" });
      loadPeople();
      setMessage("Trusted person added successfully");
    }
      catch (err) {
      setError(err.response?.data?.message || "Failed to add trusted person");
    } 
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTrustedPerson(id);
    loadPeople();
  };

  return (
    <div className="space-y-8 max-w-3xl">

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Add Trusted Person
        </h2>



        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
            className="border rounded-lg px-4 py-2"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className="border rounded-lg px-4 py-2"
          />
          <input
            name="relation"
            value={form.relation}
            onChange={handleChange}
            placeholder="Relation (e.g. Brother)"
            required
            className="border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            Add
          </button>

          

        </form>

        {message && (
            <p className="text-green-600 text-sm mt-2">{message}</p>
          )}

          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Trusted People
        </h2>

        {people.length === 0 ? (
          <p className="text-slate-500">No trusted people added</p>
        ) : (
          <ul className="space-y-4">
            {people.map((person) => (
              <li
                key={person._id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {person.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {person.email} • {person.relation}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      person.status === "VERIFIED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {person.status}
                  </span>

                  <button
                    onClick={() => handleDelete(person._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
