//css
import "./Forms.css";

//code
const GalleryForm = () => {
  return (
    <div className="gallery-form-container menu8-container">
      <form action="">
        {/* galleryeventtitle */}
        <div className="individual-form-container">
          <label htmlFor="gallery-event-title">Event Title</label>
          <input
            required
            type="text"
            id="gallery-event-title"
            name="gallery-event-title"
            className="form-control form-input"
            placeholder="Event Title"
          />
        </div>

        {/* gallery-event-date */}
        <div className="individual-form-container">
          <label htmlFor="gallery-event-date" className="form-label">
            Event Date
          </label>
          <input
            required
            type="date"
            id="gallery-event-date"
            name="gallery-event-date"
            className="form-control form-input"
          />
        </div>

        <hr className="mt-5 mb-5 gallery-divider" />

        <div className="add-gallery-image-container">
          <form action="">
            {/* galleryaddimages */}
            <div className="individual-form-container">
              <label htmlFor="gallery-add-image" className="form-label">
                Image URL
              </label>
              <input
                required
                type="url"
                id="gallery-add-image"
                name="gallery-add-image"
                className="form-control gallery-form-input"
                placeholder="Image URL"
              />
            </div>

            <div className="individual-form-container">
              <input
                type="submit"
                className="form-control gallery-form-input bg-primary text-white"
                value="save"
              />
            </div>
          </form>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;
