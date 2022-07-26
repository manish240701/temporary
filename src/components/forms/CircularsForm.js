//dependencies
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useState, useContext, useEffect } from "react";

//components
import { EditContext } from "../../Context/EditContext";

//css
import "./Forms.css";

//code
const CircularsForm = () => {
  //states
  const [data, setData] = useState({});
  const [editData, setEditData] = useState({});
  const { id } = useContext(EditContext);
  const { isClicked } = useContext(EditContext);

  //handlers
  const AddHandler = async (event) => {
    event.preventDefault();
    try {
      const id = "id" + new Date().getTime();
      await setDoc(doc(db, "circulars", id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setData({});
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const InputHandler = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setData({ ...data, [id]: value });
  };

  const EditHandler = async (event) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "circulars", id), {
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
      const docRef = doc(db, "circulars", id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, id]);

  return (
    <div className="circulars-form-container menu6-container">
      {!isClicked && (
        <form onSubmit={AddHandler}>
          {/* circularname */}
          <div className="individual-form-container">
            <label htmlFor="circular-name" className="form-label">
              Circular Name
            </label>
            <input
              defaultValue=""
              type="text"
              id="circular-name"
              name="circular-name"
              className="form-control form-input"
              placeholder="Circular Name"
              onChange={InputHandler}
            />
          </div>

          {/* circularDate */}
          <div className="individual-form-container">
            <label htmlFor="circular-date" className="form-label">
              Circular Date
            </label>
            <input
              defaultValue=""
              type="date"
              id="circular-date"
              name="circular-date"
              className="form-control form-input"
              placeholder="Circular date"
              onChange={InputHandler}
            />
          </div>

          {/* circularurl */}
          <div className="individual-form-container">
            <label htmlFor="circular-url" className="form-label">
              Circular URL
            </label>
            <input
              defaultValue=""
              type="url"
              id="circular-url"
              name="circular-url"
              className="form-control form-input"
              placeholder="Circular url"
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
          {/* circularname */}
          <div className="individual-form-container">
            <label htmlFor="circular-name" className="form-label">
              Circular Name
            </label>
            <input
              type="text"
              id="circular-name"
              name="circular-name"
              className="form-control form-input"
              placeholder="Circular Name"
              value={editData["circular-name"]}
              onChange={EditInputHandler}
            />
          </div>

          {/* circularurl */}
          <div className="individual-form-container">
            <label htmlFor="circular-url" className="form-label">
              Circular URL
            </label>
            <input
              type="url"
              id="circular-url"
              name="circular-url"
              className="form-control form-input"
              value={editData["circular-url"]}
              placeholder="Circular url"
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

export default CircularsForm;
