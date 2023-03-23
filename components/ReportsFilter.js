import Dropdown from "./Dropdown";

function ReportsFilter({ statusFilter, setStatusFilter, statusColors }) {
  return (
    <div>
      <div className="mb-4 flex items-center">
        <Dropdown
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          statusColors={statusColors}
        />
      </div>
    </div>
  );
}

export default ReportsFilter;
