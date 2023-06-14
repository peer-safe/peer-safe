const BaseButton = (props: any) => {
  const { children, className, ...rest } = props;
  return (
    <button
      className={`select-none text-white hover:cursor-pointer disabled:cursor-progress ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BaseButton;
