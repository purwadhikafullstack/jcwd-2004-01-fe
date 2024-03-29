import Link from "next/link";

const MobileHeader = ({
  firstProp,
  secondProp,
  thirdProp,
  fourthProp,
  classExtend,
  secondPropClassExtend,
}) => {
  const logo = "/LogoHealthymedBW.svg";

  return (
    <div className={`container-mobile-header ${classExtend}`}>
      <Link href="/">
        <div className="hidden lg:inline-block hover:cursor-pointer">
          <img src={logo} alt="" />
        </div>
      </Link>

      {firstProp ? (
        <div className="icon-mobile-header lg:hidden">{firstProp}</div>
      ) : null}

      {secondProp && !thirdProp && !fourthProp ? (
        <div className="text-2xl font-bold text-blackPrimary w-96 mb-1">
          {secondProp}
        </div>
      ) : (
        <div
          className={`text-2xl font-bold text-${secondPropClassExtend} mb-1`}
        >
          {secondProp}
        </div>
      )}

      {thirdProp ? <div className="icon-mobile-header">{thirdProp}</div> : null}

      {fourthProp ? (
        <div className="icon-mobile-header">{fourthProp}</div>
      ) : null}
    </div>
  );
};

export default MobileHeader;
