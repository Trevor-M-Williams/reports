function Title({ url }) {
  let textSize = "text-xl";
  if (url.length > 35) textSize = "text-md";
  else if (url.length > 25) textSize = "text-lg";

  return (
    <div
      className={`mt-[2vh] flex flex-col justify-center ${textSize} text-center sm:text-xl`}
    >
      <div className="flex">
        <div className="mr-2 font-medium">Domain:</div>
        <a href={url} target="_blank" className="text-blue-700">
          {url}
        </a>
      </div>
    </div>
  );
}

export default Title;
