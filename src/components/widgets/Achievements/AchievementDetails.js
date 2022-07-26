//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";
import React from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

//components
import { EditContext } from "../../../Context/EditContext";
import Modal from "../Modal.js";
//code
const AchievementDetails = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  //handlers
  const DeleteHandler = async (deleteId) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, `achievements/${id}/persons`, deleteId));
      setData(data.filter((item) => item.id !== id));
    }
  };

  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(
        collection(db, `achievements/${id}/persons`),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
          dispatch({ type: "CLICKED" });
          return;
        }
      );
      return () => {
        unsub();
      };
    };
    fetchData();
  }, [data]);

  return (
    <>
      <div className="achievementdetails mt-5">
        <table className="text-white mt-5">
          <tbody>
            {location.pathname}
            {data
              .slice(0)
              .reverse()
              .map((d) => {
                return (
                  <tr key={d["timeStamp"]}>
                    <td>{d["name"]}</td>
                    <td>{d["game"]}</td>
                    <td>{d["eventname"]}</td>
                    <td>{d["position"]}</td>
                    <td>
                      <button
                        className="atheleticHonors-edit-button admin-edit-btn me-2"
                        data-toggle="modal"
                        data-target="#modal-fullscreen-xl"
                        data-bs-toggle="modal"
                        data-bs-target="#addEditModal"
                        onClick={() => {
                          EditHandler(d.id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          DeleteHandler(d.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal />
    </>
  );
};

export default AchievementDetails;
