//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";

//components
import { EditContext } from "../../../Context/EditContext";
import SearchBar from "../SearchBar";
import DeleteModal from "../DeleteModal";

//css
import "./AthleticHonorsIndividualContainer.css";

//code
const AthleticHonorsIndividualContainer = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);

  //handlers
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, "athletichonors", id));
      setData(data.filter((item) => item.id !== id));
    }
  };

  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "athletichonors"), (snapShot) => {
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
          <div
            className="athletic-honors-individual-container"
            key={d.timeStamp}
          >
            {/* athlete-image */}
            <div className="athletic-honors-athlete-image">
              <iframe
                src="https://drive.google.com/file/d/1HyYuSdW3eYyI371z2oeuIcyB8XPJCZCG/preview"
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              ></iframe>
            </div>

            {/* athlete-name */}
            <div className="athletic-honors-athlete-name">
              <h3 className="athlete-name green mt-3">{d["athlete-name"]}</h3>
            </div>
            {/*Athlete achievement*/}
            <div className="athletic-honors-achievements-details">
              {/* event name */}
              <div className="athletic-honors-event-name">
                <p className="athlete-event-name">
                  {d["athlete-achievement-event-details"]}
                </p>
              </div>

              {/*event prize */}
              <div className="athletic-honors-event-prize">
                <p className="athlete-event-prize">
                  {d["athlete-achievement-prize-details"]}
                </p>
              </div>
            </div>

            <div className="athletic-honors-buttons">
              <button
                className="atheleticHonors-edit-button admin-edit-btn me-2"
                data-toggle="modal"
                data-target="#modal-fullscreen-xl"
                data-bs-toggle="modal"
                data-bs-target="#addEditModal"
                onClick={() => EditHandler(d.id)}
              >
                Edit
              </button>
              <button
                className="atheleticHonors-delete-button admin-delete-btn"
                data-bs-toggle="modal"
                data-bs-target="#delete- modal"
                onClick={() => DeleteHandler(d.id)}
              >
                Delete
              </button>
            </div>
            <DeleteModal />
          </div>
        ))}
    </>
  );
};

export default AthleticHonorsIndividualContainer;
