//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";

//components
import DeleteModal from "../DeleteModal";
import { EditContext } from "../../../Context/EditContext";
import SearchBar from "../SearchBar";

//css
import "./CircularsIndividualContainer.css";

//code
const CircularsIndividualContainer = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);

  //handlers
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, "circulars", id));
      setData(data.filter((item) => item.id !== id));
    }
  };

  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "circulars"), (snapShot) => {
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
  }, []);

  return (
    <>
      <div className="global-search-filter">
        <SearchBar placeholder="Search for blogs..." />
        {/* setValue={(value) => filterHandler(value)} */}
      </div>
      {data
        .slice(0)
        .reverse()
        .map((d) => (
          <div className="circulars-individual-container" key={d.timeStamp}>
            <div className="circulars-individual-container-row row">
              {/* edit icon */}
              <div className="col-1 circulars-individual-edit-icon">
                <a
                  href=""
                  data-toggle="modal"
                  data-target="#modal-fullscreen-xl"
                  data-bs-toggle="modal"
                  data-bs-target="#addEditModal"
                  onClick={() => EditHandler(d.id)}
                >
                  <i className="fa-solid fa-pen edit-icon"></i>
                </a>
              </div>

              {/* circular-date */}
              <div className="col-2 circulars-date">
                <p className="green">{d["circular-date"]}</p>
              </div>

              {/* circular-title */}
              <div className="col-7 circulars-title">
                <h5 className="circulars-title white">{d["circular-name"]}</h5>
              </div>

              <div className="col-2 ps-5 circulars-individual-container-delete">
                {/* delete icon */}
                <a
                  href=""
                  data-bs-toggle="modal"
                  data-bs-target="#delete- modal"
                >
                  <button
                    className="circulars-delete-btn admin-delete-btn"
                    onClick={() => DeleteHandler(d.id)}
                  >
                    Delete
                  </button>
                </a>
              </div>

              <DeleteModal />
            </div>
          </div>
        ))}
    </>
  );
};

export default CircularsIndividualContainer;
