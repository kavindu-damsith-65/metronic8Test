import * as reqSend from "../middleware/reqSender";
import { useEffect, useState } from "react";
import { Host, range, shortenDescription } from "../server";

export default function LatestMovies() {
  const [latestMovies, setLatestMovies] = useState(null);

  useEffect(() => {
    reqSend.defaultReqPost(
      "POST",
      "films/get-film-details",
      {
        filter: "latest",
        limit: "8",
      },
      (response) => {
        if (response.status !== 200) {
          console.log(response.data["message"]);
        } else {
          setLatestMovies(response.data);
        }
      }
    );
  }, []);

  return (
    <>
      <section id="trend" class="pt-4 pb-5">
        <div class="container mt-5 mb-5">
          <div class="row trend_1">
            <div class="col-md-6 col-6">
              <div class="trend_1l">
                <h4 class="mb-0">
                  <i class="fa fa-youtube-play align-middle col_red me-1"></i>{" "}
                  Latest <span class="col_red">Movies</span>
                </h4>
              </div>
            </div>
            <div class="col-md-6 col-6">
              <div class="trend_1r text-end">
                <h6 class="mb-0">
                  <a class="button" href="#">
                    {" "}
                    View All
                  </a>
                </h6>
              </div>
            </div>
          </div>
          <div class="row trend_2 mt-4">
            <div
              id="carouselExampleCaptions1"
              class="carousel slide"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions1"
                  data-bs-slide-to="0"
                  class="active"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions1"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                  class=""
                  aria-current="true"
                ></button>
              </div>
              <div class="carousel-inner">
                {latestMovies
                  ? range(0, Math.ceil(latestMovies.length / 4)).map((i) => {
                      return (
                        <>
                          <div
                            key={i}
                            class={
                              i === 0 ? "carousel-item active" : "carousel-item"
                            }
                          >
                            <div class="trend_2i row">
                              {latestMovies
                                .slice(i * 4, (i + 1) * 4)
                                .map((value, index) => {
                                  return (
                                    <div key={index} class="col-md-3 col-6">
                                      <div class="trend_2im clearfix position-relative">
                                        <div class="trend_2im1 clearfix">
                                          <div class="grid">
                                            <figure class="effect-jazz mb-0">
                                              <a href="#">
                                                <img
                                                  src={
                                                    Host() +
                                                    "get-uploads/" +
                                                    value.image
                                                  }
                                                  class="w-100"
                                                  alt="img25"
                                                />
                                              </a>
                                            </figure>
                                          </div>
                                        </div>
                                        <div class="trend_2im2 clearfix text-center position-absolute w-100 top-0">
                                          <span class="fs-1">
                                            <a class="col_red" href="#">
                                              <i class="fa fa-youtube-play"></i>
                                            </a>
                                          </span>
                                        </div>
                                      </div>
                                      <div class="trend_2ilast bg_grey p-3 clearfix">
                                        <h5>
                                          <a class="col_red" href="#">
                                            {value.name} ({value.year})
                                          </a>
                                        </h5>
                                        <p class="mb-2">
                                          {shortenDescription(
                                            value.description,
                                            55
                                          )}
                                        </p>
                                        <span class="col_red">
                                          {range(
                                            0,
                                            Math.ceil((value.rating / 10) * 5)
                                          ).map((i) => {
                                            return <i class="fa fa-star"></i>;
                                          })}
                                        </span>
                                        <p class="mb-0">1 Views</p>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
