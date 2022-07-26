//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";

//components
import { EditContext } from "../../../Context/EditContext";
import SearchBar from "../SearchBar";
import DeleteModal from "../DeleteModal";

//css
import "./BlogsIndividualContainer.css";

//code
const BlogsIndividualContainer = () => {
  //states
  const [data, setData] = useState([]);
  const { dispatch } = useContext(EditContext);

  //handlers
  const DeleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the record") === true) {
      await deleteDoc(doc(db, "blogs", id));
      setData(data.filter((item) => item.id !== id));
    }
  };

  const EditHandler = (id) => {
    dispatch({ type: "CLICKED", payload: id });
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
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
          <div className="blogs-individual-container" key={d.timeStamp}>
            <img
              className="image-fluid blogs-image"
              src="https://images.pexels.com/photos/11389315/pexels-photo-11389315.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="blog-individual-image"
              width="100%"
            />
            <h4 className=" blogs-title green mt-3">{d["blog-title"]}</h4>
            <p className="blogs-created-date">24/07/2001</p>

            <button
              className="admin-edit-btn"
              data-toggle="modal"
              data-target="#modal-fullscreen-xl"
              data-bs-toggle="modal"
              data-bs-target="#addEditModal"
              onClick={() => EditHandler(d.id)}
            >
              Edit
            </button>
            <button
              className="admin-delete-btn"
              data-bs-toggle="modal"
              data-bs-target="#delete -modal"
              onClick={() => DeleteHandler(d.id)}
            >
              Delete
            </button>

            <DeleteModal />
          </div>
        ))}
    </>
  );
};

export default BlogsIndividualContainer;
