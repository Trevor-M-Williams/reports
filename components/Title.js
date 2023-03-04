function Title({ url }) {
  return (
    <div className="flex flex-col justify-center mt-[2vh] text-xl text-center">
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
