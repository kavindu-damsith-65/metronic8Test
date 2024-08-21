import { Link } from "react-router-dom";
import SocialMediaList from "./SocialMediaList";

export default function TopBar() {
  return (
    <section className="d-md-block d-none py-3">
      {/* id="top" */}
      <div className="container">
        <div className="row top_1">
          <div className="col-md-3">
            <div className="top_1l pt-1">
              <h3 className="mb-0">
                <Link to="/" className="text-white">
                  <i className="fa fa-video-camera col_red me-1"></i> Planet
                </Link>
              </h3>
            </div>
          </div>
          <div className="col-md-5">
            <div className="input-group input-group-m border">
              <input
                type="text"
                className="form-control bg-black form-control"
                placeholder="Search Site..."
              />

              <button
                className="btn bg-red text-white btn-sm rounded-0 "
                style={{ background: "#de1002" }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-md-4 ">
            <SocialMediaList />
          </div>
        </div>
      </div>
    </section>
  );
}
