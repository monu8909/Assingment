export default function SearchBar({ setQuery }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // Prevent leading space
    if (value.startsWith(" ") && value.trim() === "") return;
    setQuery(value);
  };

  return (
    <input onChange={handleChange} placeholder="Search by name or email" />
  );
}
