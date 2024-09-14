import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function SearchFilterInput() {
  return (
    <div className="flex-1 space-y-2 sm:space-y-1">
      <div className="flex items-center justify-between">
        <span>Search</span>
        <button>Clear</button>
      </div>
      <label className="flex items-center gap-2 border-2 border-secondary/50 p-1">
        <HiOutlineMagnifyingGlass />
        <input
          type="text"
          placeholder="Keyword"
          className="flex-1 outline-none"
        />
      </label>
    </div>
  );
}
