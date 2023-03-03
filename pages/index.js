export default function Home() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <input
        type="text"
        placeholder="Enter Your Company Name"
        className="w-1/2 h-12 px-4 text-xl border border-gray-400 rounded-lg placeholder:text-center focus:border-blue-500"
      />
    </div>
  );
}
