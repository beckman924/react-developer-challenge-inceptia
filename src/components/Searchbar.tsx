import { Icon } from "@iconify-icon/react";

export default function Searchbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form className="mr-8">
      <div className="relative">
        {!search && (
          <div className="absolute inset-y-0 end-4 flex items-center pointer-events-none">
            <Icon
              icon="iconamoon:search-thin"
              className="w-4 h-4 text-[#d4d6db]"
            />
          </div>
        )}

        <input
          type="search"
          id="searchClient"
          className="w-full px-5 h-8 text-sm placeholder:text-[#d4d6db] border border-[#ebeef0] rounded-lg focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          placeholder="ID Caso, ID Cliente o Tel"
          required
          autoComplete="off"
          spellCheck="false"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
