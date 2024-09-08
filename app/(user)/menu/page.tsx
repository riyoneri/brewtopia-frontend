import PriceFilterInput from "@/components/filter/price-filter-input";
import SearchFilterInput from "@/components/filter/search-filter-input";

export default function MenuPage() {
  return (
    <>
      <title>Menu</title>
      <main className="maximum-width mt-5 space-y-5">
        <h2 className="main-heading">Our Menu</h2>
        <p className="text-balance lg:w-4/5">
          BrewTopia provides a varietyof high quality coffee and drinks and
          flavors that are suitable for you to support and cheer up you day. We
          also supply coffee to a company you at home along with the equipment
        </p>

        <div className="flex gap-5">
          <SearchFilterInput />
          <PriceFilterInput />
        </div>
      </main>
    </>
  );
}
