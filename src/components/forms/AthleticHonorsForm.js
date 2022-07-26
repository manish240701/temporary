//dependencies
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

//components
import { EditContext } from "../../Context/EditContext";

//css
import "./Forms.css";

//code
const AthleticHonors = () => {
  //states
  const history = useHistory();
  const [data, setData] = useState({});
  const [editData, setEditData] = useState({});
  const { id } = useContext(EditContext);
  const { isClicked } = useContext(EditContext);

  //handlers
  const AddHandler = async (event) => {
    event.preventDefault();
    try {
      const id = "id" + new Date().getTime();
      await setDoc(doc(db, "athletichonors", id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setData({});
      history.push("/athletichonors");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const InputHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
    console.log(data);
  };

  const EditHandler = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "athletichonors", id), {
        ...editData,
        timeStamp: serverTimestamp(),
      });
      console.log("saved");
    } catch (error) {
      console.log(error);
    }
  };

  const EditInputHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setEditData({
      ...editData,
      [id]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "athletichonors", id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, id]);

  return (
    <div className="athletic-honors-form-container menu4-container">
      {!isClicked && (
        <form onSubmit={AddHandler}>
          {/* athlete image */}
          <div className="individual-form-container">
            <label htmlFor="athlete-image" className="form-label">
              Athlete Image
            </label>
            <input
              type="url"
              id="athlete-image"
              name="athlete-image"
              className="form-control form-input"
              placeholder="Enter the url of the image"
              defaultValue=""
              onChange={InputHandler}
            />
          </div>

          {/* athletename */}
          <div className="individual-form-container">
            <label htmlFor="athlete-name" className="form-label">
              Athlete Name
            </label>
            <input
              type="text"
              id="athlete-name"
              name="athlete-name"
              className="form-control form-input"
              placeholder="Athlete Name"
              defaultValue=""
              onChange={InputHandler}
            />
          </div>

          {/* event details*/}
          <div className="individual-form-container">
            <label
              htmlFor="athlete-achievement-event-details"
              className="form-label"
            >
              Event Details
            </label>
            <input
              type="text"
              id="athlete-achievement-event-details"
              name="athlete-achievement-event-details"
              className="form-control form-input"
              placeholder="Event Details"
              defaultValue=""
              onChange={InputHandler}
            />
          </div>

          {/* prizedetails */}
          <div className="individual-form-container">
            <label
              htmlFor="athlete-achievement-prize-details"
              className="form-label"
            >
              Prize and Game Details
            </label>
            <input
              type="text"
              id="athlete-achievement-prize-details"
              name="athlete-achievement-prize-details"
              className="form-control form-input"
              defaultValue=""
              placeholder="Prize and Game Details"
              onChange={InputHandler}
            />
          </div>
          {/*Submit buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn modal-form-btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn modal-form-btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </form>
      )}
      {isClicked && (
        <form onSubmit={EditHandler}>
          {/* athlete image */}
          <div className="individual-form-container">
            <label htmlFor="athlete-image" className="form-label">
              Athlete Image
            </label>
            <input
              type="url"
              id="athlete-image"
              name="athlete-image"
              className="form-control form-input"
              placeholder="Enter the url of the image"
              value={editData["athlete-image"]}
              onChange={EditInputHandler}
            />
          </div>

          {/* athletename */}
          <div className="individual-form-container">
            <label htmlFor="athlete-name" className="form-label">
              Athlete Name
            </label>
            <input
              type="text"
              id="athlete-name"
              name="athlete-name"
              className="form-control form-input"
              value={editData["athlete-name"]}
              placeholder="Athlete Name"
              onChange={EditInputHandler}
            />
          </div>

          {/* event details*/}
          <div className="individual-form-container">
            <label
              htmlFor="athlete-achievement-event-details"
              className="form-label"
            >
              Event Details
            </label>
            <input
              type="text"
              id="athlete-achievement-event-details"
              name="athlete-achievement-event-details"
              className="form-control form-input"
              value={editData["athlete-achievement-event-details"]}
              placeholder="Event Details"
              onChange={EditInputHandler}
            />
          </div>

          {/* prizedetails */}
          <div className="individual-form-container">
            <label
              htmlFor="athlete-achievement-prize-details"
              className="form-label"
            >
              Prize and Game Details
            </label>
            <input
              type="text"
              id="athlete-achievement-prize-details"
              name="athlete-achievement-prize-details"
              className="form-control form-input"
              value={editData["athlete-achievement-prize-details"]}
              placeholder="Prize and Game Details"
              onChange={EditInputHandler}
            />
          </div>
          {/*Submit buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn modal-form-btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn modal-form-btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AthleticHonors;
