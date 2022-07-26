//components
import GalleryIndividualContainer from "../components/widgets/Gallery/GalleryIndividualContainer";
import SearchBar from "../components/widgets/SearchBar.js"
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/Gallery.css";

//code
const Gallery = () => {
    return ( 
        <div className="gallery-container">

            {/* searchbar */}
            <div className="global-search-filter">
                <SearchBar placeholder="Search for Gallery..."/>
            </div>

            {/* gallery-container */}
            <div className="gallery-container-row">
                <GalleryIndividualContainer/>
            </div>

            {/* modal */}
            <Modal/>
            <div className="global-add-btn" data-toggle="modal" data-target="#modal-fullscreen-xl" data-bs-toggle="modal" data-bs-target="#addEditModal">
                <AddButton/>
            </div>
        </div>
    );
}
 
export default Gallery;