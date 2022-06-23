const Button = ({
  fill,
  text,
  isDisabled,
  icon,
  extendClass,
  px,
  py,
  pxlg,
  pylg,
}) => {
  return (
    <>
      {isDisabled ? (
        <button
          className={`disabled-button px-${px} py-${py} lg:px-${pxlg} lg:py-${pylg} ${extendClass} `}
        >
          {icon}
          {text}
        </button>
      ) : (
        <>
          {fill ? (
            <button
              className={`fill-button px-${px} py-${py} lg:px-${pxlg} lg:py-${pylg} ${extendClass}`}
            >
              {icon}
              {text}
            </button>
          ) : (
            <button
              className={`bare-button gap-2 px-${px} py-${py} lg:px-${pxlg} lg:py-${pylg} ${extendClass}`}
            >
              {icon}
              {text}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Button;
