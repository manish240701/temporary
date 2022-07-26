//dependencies
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../Firebase";
import { Route, Link, useLocation } from "react-router-dom";

//components
import { EditContext } from "../../../Context/EditContext";
import SearchBar from "../SearchBar";
import DeleteModal from "../DeleteModal";
//css
import "./AchievementsIndividualContainer.css";

//code
const AchievementsIndividualContainer = () => {


  //handlers



  return (
    <Route>
      <div className="global-search-filter">
        <SearchBar placeholder="Search for blogs..." />
        {/* setValue={(value) => filterHandler(value)} */}
      </div>
      <Link to="/achievements/throwball">
        <div className="achievements-individual achievements-throwball text-white p-5">
          Throwball
        </div>
      </Link>

      <Link to="/achievements/volleyball">
        <div className="achievements-individual achievements-throwball text-white p-5">
          VolleyBall
        </div>
      </Link>
    </Route>
  );
};

export default AchievementsIndividualContainer;

// <div className="achievements-individual-container">
//   <div className="achievements-individual-container-row row">
//     {/* edit icon */}
//     <div className="col-1 achievements-individual-container-edit">
//       <a
//         href=""
//         data-toggle="modal"
//         data-target="#modal-fullscreen-xl"
//         data-bs-toggle="modal"
//         data-bs-target="#addEditModal"
//         // onClick={() => EditHandler(d.id)}
//       >
//         <i className="fa-solid fa-pen edit-icon  mt-4"></i>
//       </a>
//     </div>

//     {/* achievement cover image */}
//     <div className="col-2 achievements-individual-container-image">
//       <img
//         src="https://images.pexels.com/photos/11389315/pexels-photo-11389315.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
//         className="image-fluid achievement-cover-image"
//         alt="achievement individual image"
//         width="70%"
//       />
//     </div>

//     {/* achievementdetails */}
//     <div className="col-8 achievements-individual-content-container">
//       <h3 className="achievements-event-name green pt-1">
//         National State Meet Coimbatore
//       </h3>
//       <div className="achievements-individual-subcontent-row row">
//         <div className="col-3 achievements-individual-subcontent-date">
//           <p className="achievements-event-date white">
//             Date :
//             <span className="achievements-event-date-value">
//               24/07/2001
//             </span>
//           </p>
//         </div>
//         <div className="col-4 achievements-individual-subcontent-location">
//           <p className="achievements-event-location white">
//             Place :
//             <span className="achievements-event-location-value">
//               Pattanam, Coimbatore
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className="col-1 achievements-individual-container-delete">
//       {/* delete icon */}
//       <a>
//         <button
//           className="achievements-delete-btn admin-delete-btn mt-4"
//           data-bs-toggle="modal"
//           data-bs-target="#delete-modal"
//           // onClick={() => DeleteHandler(d.id)}
//         >
//           Delete
//         </button>
//       </a>
//     </div>
//     <DeleteModal />
//   </div>
// </div>
