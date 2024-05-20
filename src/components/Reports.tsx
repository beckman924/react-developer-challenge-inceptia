"use client";

import { useState } from "react";

import { Icon } from "@iconify-icon/react";

import { Clients } from "@/types";

export default function Reports({
  selectedClient,
}: {
  selectedClient: Clients | null;
}) {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-full h-full">
      <div className="flex items-center w-full h-[45px] border border-y-[#eff3f9] justify-between">
        <h3 className="text-base text-black/60 p-2.5">REPORTES</h3>

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
              className="w-full px-5 h-8 text-sm text-[#d4d6db] border border-[#ebeef0] rounded-lg bg-gray-50 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
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
      </div>
    </div>
  );
}
