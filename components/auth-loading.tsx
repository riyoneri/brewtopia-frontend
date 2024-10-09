import classNames from "classnames";

interface AuthLoadingProperties {
  fullHeight?: boolean;
}

export default function AuthLoading({
  fullHeight = true,
}: AuthLoadingProperties) {
  return (
    <>
      <title>Loading...</title>
      <div
        className={classNames("grid place-content-center", {
          "min-h-dvh": fullHeight,
          "hero-height": !fullHeight,
        })}
      >
        <span className="dui-loading dui-loading-spinner dui-loading-lg bg-primary"></span>
      </div>
    </>
  );
}
