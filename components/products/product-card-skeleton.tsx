export default function ProductCardSkeleton() {
  return (
    <div className="card-with-shadows flex flex-col gap-2 bg-white">
      <div className="dui-skeleton h-72 rounded-none object-cover sm:h-60"></div>
      <div className="flex flex-1 flex-col gap-1 px-1">
        <span className="dui-skeleton h-5 rounded-none"></span>
        <div className="flex items-center gap-1">
          <span className="dui-skeleton h-7 w-1/6 rounded-none"></span>
          <span className="dui-skeleton h-4 w-1/12 rounded-none"></span>
        </div>
        <p className="dui-skeleton h-4 rounded-none text-sm text-primary"></p>
      </div>
    </div>
  );
}
