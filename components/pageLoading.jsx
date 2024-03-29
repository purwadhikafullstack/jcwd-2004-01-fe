const PageLoading = () => {
  return (
    <div className="bg-blackPrimary flex space-x-4 mx-auto p-5 rounded-full justify-center mt-[40vh] w-[150px] items-center">
      <div className="bg-white p-2 w-4 h-4 rounded-full animate-bounce blue-circle"></div>
      <div className="bg-white p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
      <div className="bg-white p-2 w-4 h-4 rounded-full animate-bounce red-circle"></div>
    </div>
  );
};

export default PageLoading;
