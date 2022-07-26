//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { EditContext } from "../../../Context/EditContext";

//components
import SearchBar from "../SearchBar";
import StudentDatabaseFilter from "./StudentDatabaseFilter";

//css
import "../Table.css";

//code
const StudentDatabaseTable = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const temp = data;
  //handlers
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, "students", id));
      setData(data.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "students"), (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        dispatch({ type: "CLICKED" });
        return;
      });
      return () => {
        unsub();
      };
    };
    fetchData();
  }, [dispatch]);

  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  const filterHandler = (value) => {
    if (value === "") {
      setData(temp);
    } else {
      setData(
        data.filter(
          (d) => d["student-name"].toLowerCase() === value.toLowerCase()
        )
      );
    }
  };

  return (
    <>
      <SearchBar
        placeholder="Search..."
        setValue={(value) => filterHandler(value)}
      />
      <StudentDatabaseFilter />

      <div className="student-database-table-container mt-5">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Renewal Date</th>
              <th scope="col">Status</th>
              <th scope="col">Game</th>
              <th scope="col">Gender</th>
              <th scope="col">Blood Group</th>
              <th scope="col">DOB</th>
              <th scope="col">Parent's Contact</th>
              <th scope="col">Other health issues</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {data
            .slice(0)
            .reverse()
            .map((d) => (
              <tbody key={d.timeStamp}>
                <tr className="table-row">
                  <td>
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#modal-fullscreen-xl"
                      data-bs-toggle="modal"
                      data-bs-target="#addEditModal"
                      onClick={() => EditHandler(d.id)}
                    >
                      <i className="table-edit-icon fa-solid fa-pen"></i>
                    </a>
                  </td>
                  <td>{d["studentId"]}</td>
                  <td>{d["student-name"]}</td>
                  <td>{d["student-contact"]}</td>
                  <td>{d["student-fees-renewal"]}</td>
                  <td>{d["student-status"]}</td>
                  <td>{d["student-games"]}</td>
                  <td>{d["student-gender"]}</td>
                  <td>{d["student-blood-group"]}</td>
                  <td>{d["student-dob"]}</td>
                  <td>{d["student-parent-contact"]}</td>
                  <td>{d["student-health-issues"]}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => DeleteHandler(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
};

export default StudentDatabaseTable;
