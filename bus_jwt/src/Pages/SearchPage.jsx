import { useCallback, useContext, useMemo, useState } from "react";
import BusCard from "../Components/BusCard";
import { BookingContext } from "../Context/BookingContextObject";

function SearchPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { buses } = useContext(BookingContext);

  const handleSwap = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [from, to]);

  const matchesPlace = useCallback(
    (place, searchText) =>
      place.toLowerCase().includes(searchText.trim().toLowerCase()),
    []
  );

  const places = useMemo(
    () => [...new Set(buses.flatMap((bus) => [bus.from, bus.to]))],
    [buses]
  );

  const filteredBuses = useMemo(
    () =>
      buses.filter((bus) => {
        const fromMatches = from === "" || matchesPlace(bus.from, from);
        const toMatches = to === "" || matchesPlace(bus.to, to);

        return fromMatches && toMatches;
      }),
    [buses, from, matchesPlace, to]
  );

  const hasSearched = useMemo(
    () => from.trim() !== "" || to.trim() !== "",
    [from, to]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-2 px-4">
      <h1 className="font-bold text-stone-800 flex items-center text-2xl mt-2">Find your buses</h1>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-3 ">
        <input className="p-2.5 w-full sm:w-[250px] border border-slate-300 rounded-md text-base"
          type="search"
          list="places"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <button type="button" onClick={handleSwap} className="cursor-pointer mx-2.5 select-none px-3.5 py-2.5 bg-lime-200 border border-slate-300 rounded-md">
         ⇄
        </button>

        <input
          className="p-2.5 w-full sm:w-[250px] border border-slate-300 rounded-md text-base"
          type="search"
          list="places"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <datalist id="places">
          {places.map((place) => (
            <option key={place} value={place} />
          ))}
        </datalist>
      </div>

      {hasSearched && (
        <div className="mt-5 w-full grid gap-5 justify-center [grid-template-columns:repeat(auto-fit,_minmax(250px,300px))]">
          {filteredBuses.map((bus) => (
            <BusCard key={bus.id} bus={bus} />
          ))}

          {filteredBuses.length === 0 && (
            <p className="col-span-full text-center text-slate-500 text-lg">No buses found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
