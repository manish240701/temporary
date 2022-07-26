//css
import "./DeleteModal.css";

//code
const DeleteModal = () => {
  return (
    <div className="delete-modal-container">
        <div className="modal fade" id="delete-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog delete-modal-dialog">

            {/* modal-content */}
            <div className="modal-content delete-modal-content">

                {/* modal body */}
                <div className="modal-body mt-3 text-center">
                    <h6>Are you sure you need to delete the record?</h6>
                </div>

                {/* modal footer */}
                <div className="modal-footer delete-modal-footer">
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default DeleteModal