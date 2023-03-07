function Title({ url }) {
  let textSize = "text-xl";
  if (url.length > 35) textSize = "text-md";
  else if (url.length > 25) textSize = "text-lg";

  return (
    <div
      className={`flex flex-col justify-center mt-[2vh] ${textSize} sm:text-xl text-center`}
    >
      <div className="flex">
        <div className="font-medium mr-2">Domain:</div>
        <a href={url} target="_blank" className="text-blue-700">
          {url}
        </a>
      </div>
    </div>
  );
}

export default Title;
