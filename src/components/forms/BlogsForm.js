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
const BlogsForm = () => {
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
      await setDoc(doc(db, "blogs", id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setData({});
      history.push("/blogs");
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
      await setDoc(doc(db, "blogs", id), {
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
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      setEditData(docSnap.data());
    };
    isClicked ? fetchData() : setEditData({});
    console.log(isClicked);
  }, [isClicked, id]);

  return (
    <div className="blogs-form-container menu7-container">
      {!isClicked && (
        <form onSubmit={AddHandler}>
          {/* individualblogimage */}
          <div className="individual-form-container">
            <label htmlFor="blog-container-image" className="form-label">
              Blog Container Image
            </label>
            <input
              type="url"
              id="blog-container-image"
              defaultValue=""
              name="blog-container-image"
              className="form-control form-input"
              placeholder="Enter blog container image url"
              onChange={InputHandler}
            />
          </div>

          {/* blogimageurl */}
          <div className="individual-form-container">
            <label htmlFor="blog-image" className="form-label">
              Blog Image
            </label>
            <input
              type="url"
              id="blog-image"
              defaultValue=""
              name="blog-image"
              className="form-control form-input"
              placeholder="Enter image url"
              onChange={InputHandler}
            />
          </div>

          {/* blogTitle */}
          <div className="individual-form-container">
            <label htmlFor="blog-title" className="blog-title">
              Blog Title
            </label>
            <input
              type="text"
              id="blog-title"
              defaultValue=""
              name="blog-title"
              className="form-control form-input"
              placeholder="Blog title"
              onChange={InputHandler}
            />
          </div>

          {/* blogeventlocation */}
          <div className="individual-form-container">
            <label htmlFor="blog-event-location" className="form-label">
              Event Location
            </label>
            <input
              type="text"
              id="blog-event-location"
              defaultValue=""
              name="blog-event-location"
              className="form-control form-input"
              placeholder="Event location"
              onChange={InputHandler}
            />
          </div>

          {/* blogcontent */}
          <div className="individual-form-container">
            <label htmlFor="blog-content" className="form-label">
              Blog Content
            </label>
            <textarea
              name="blog-content"
              id="blog-content"
              defaultValue=""
              className="form-control form-input"
              placeholder="Type Something..."
              cols="30"
              rows="10"
              onChange={InputHandler}
            ></textarea>
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
          {/* individualblogimage */}
          <div className="individual-form-container">
            <label htmlFor="blog-container-image" className="form-label">
              Blog Container Image
            </label>
            <input
              type="url"
              id="blog-container-image"
              value={editData["blog-container-image"]}
              name="blog-container-image"
              className="form-control form-input"
              placeholder="Enter blog container image url"
              onChange={EditInputHandler}
            />
          </div>

          {/* blogimageurl */}
          <div className="individual-form-container">
            <label htmlFor="blog-image" className="form-label">
              Blog Image
            </label>
            <input
              type="url"
              id="blog-image"
              name="blog-image"
              className="form-control form-input"
              placeholder="Enter image url"
              value={editData["blog-image"]}
              onChange={EditInputHandler}
            />
          </div>

          {/* blogTitle */}
          <div className="individual-form-container">
            <label htmlFor="blog-title" className="blog-title">
              Blog Title
            </label>
            <input
              type="text"
              id="blog-title"
              name="blog-title"
              className="form-control form-input"
              placeholder="Blog title"
              value={editData["blog-title"]}
              onChange={EditInputHandler}
            />
          </div>

          {/* blogeventlocation */}
          <div className="individual-form-container">
            <label htmlFor="blog-event-location" className="form-label">
              Event Location
            </label>
            <input
              type="text"
              id="blog-event-location"
              name="blog-event-location"
              className="form-control form-input"
              placeholder="Event location"
              value={editData["blog-event-location"]}
              onChange={EditInputHandler}
            />
          </div>

          {/* blogcontent */}
          <div className="individual-form-container">
            <label htmlFor="blog-content" className="form-label">
              Blog Content
            </label>
            <textarea
              name="blog-content"
              id="blog-content"
              className="form-control form-input"
              placeholder="Type Something..."
              cols="30"
              rows="10"
              value={editData["blog-content"]}
              onChange={EditInputHandler}
            ></textarea>
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

export default BlogsForm;
