import Dropdown from "./Dropdown";

function ReportsFilter({ statusFilter, setStatusFilter }) {
  return (
    <div>
      <div className="mb-4 flex items-center">
        <Dropdown
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
    </div>
  );
}

export default ReportsFilter;
