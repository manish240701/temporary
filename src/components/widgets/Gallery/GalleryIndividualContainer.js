//css
import DeleteModal from "../DeleteModal";
import "./GalleryIndividualContainer.css";

//code
const GalleryIndividualContainer = () => {
  return (
    <div className="gallery-individual-container">
      {/* gallery-image */}
      <img
        src="https://images.pexels.com/photos/11389315/pexels-photo-11389315.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        alt="gallery-cover-image"
        className="image-fluid gallery-cover-image"
        width="100%"
      />

      {/* gallery-content */}
      <h4 className="gallery-title green mt-3">21st National Meet</h4>
      <p className="gallery-date white">24/07/2001</p>

      {/* gallery-options */}
      <button className="gallery-edit-btn admin-edit-btn" data-toggle="modal" data-target="#modal-fullscreen-xl" data-bs-toggle="modal" data-bs-target="#addEditModal">Edit</button>
      <button className="gallery-delete-btn admin-delete-btn "  data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button>
      <DeleteModal/>
    </div>
  );
};

export default GalleryIndividualContainer;
