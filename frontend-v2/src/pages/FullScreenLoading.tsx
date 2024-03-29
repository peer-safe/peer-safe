const FullScreenLoading = () => {
  return (
    <div className="fixed -left-20 -right-20 -top-20 -z-10 flex h-[calc(100vh+160px)] items-center justify-center bg-[#0e0e0e] bg-cover">
      <img
        src={require("../assets/logo-green.svg").default}
        className="aspect-square h-12 animate-pulse"
        alt="logo"
      ></img>
    </div>
  );
};

export default FullScreenLoading;
