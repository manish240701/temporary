//css
import "./StudentDatabaseFilter.css"

//code
const StudentDatabaseFilter = () => {
  return (
    <div className="student-database-filter-container mt-5 ms-5">
      <div className="student-database-filter-container-row row">
        <div className="col-xs-6 col-12">
          <span className="student-database-filter-name">Sort by fees</span>
          <select
            name="feesFilter"
            id="feesFilter"
            className="student-database-filter-input ms-2 me-3"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>

          <span className="student-database-filter-name ms-3">
            {" "}
            Sort by status
          </span>
          <select
            name="statusFilter"
            id="statusFilter"
            className="student-database-filter-input ms-2"
          >
            <option value="all">All</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StudentDatabaseFilter;
