import Link from "next/link";

const MobileHeader = ({
  firstProp,
  secondProp,
  thirdProp,
  fourthProp,
  classExtend,
  secondPropClassExtend,
}) => {
  const logo = "/LogoHealthymed.svg";

  return (
    <div className={`container-mobile-header ${classExtend}`}>
      <div className="hidden lg:inline-block">
        <img src={logo} alt="" />
      </div>

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

      {thirdProp ? (
        <Link href="">
          <div className="icon-mobile-header">{thirdProp}</div>
        </Link>
      ) : null}

      {fourthProp ? (
        <Link href="">
          <div className="icon-mobile-header">{fourthProp}</div>
        </Link>
      ) : null}
    </div>
  );
};

export default MobileHeader;
