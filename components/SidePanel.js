function SidePanel({ open, setOpen }) {
  let transform = "translate-x-full";
  if (open) {
    transform = "translate-x-0";
  }

  return (
    <div
      className={`absolute inset-y-0 right-0 w-1/2 max-w-xl bg-white shadow-xl transition-transform duration-500 ease-in-out ${transform}`}
    >
      <button onClick={() => setOpen(false)}>X</button>
    </div>
  );
}

export default SidePanel;
