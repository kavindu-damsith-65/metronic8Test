import img6 from "../assets/img/6.jpg";
import * as reqSend from "../middleware/reqSender";
import { useEffect, useState } from "react";
import { Host, range, shortenDescription } from "../server";

export default function PopularMovies() {
  const [latestMovies, setLatestMovies] = useState(null);
  const [popularMovies, setPopularMovies] = useState(null);

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
      <section id="popular" class="pt-4 pb-5 bg_grey">
        <div class="container">
          <div class="row trend_1">
            <div class="col-md-12">
              <div class="trend_1l">
                <h4 class="mb-0">
                  <i class="fa fa-youtube-play align-middle col_red me-1"></i>{" "}
                  Trending <span class="col_red">Events</span>
                </h4>
              </div>
            </div>
          </div>
          <div class="row popular_1 mt-4">
            <ul class="nav nav-tabs  border-0 mb-0">
              <li class="nav-item">
                <a
                  href="#home"
                  data-bs-toggle="tab"
                  aria-expanded="false"
                  class="nav-link active"
                >
                  <span class="d-md-block">JUST ARRIVED</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#profile"
                  data-bs-toggle="tab"
                  aria-expanded="true"
                  class="nav-link"
                >
                  <span class="d-md-block">POPULAR EVENTS</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#settings"
                  data-bs-toggle="tab"
                  aria-expanded="false"
                  class="nav-link"
                >
                  <span class="d-md-block">TV SHOWS</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#settings_o"
                  data-bs-toggle="tab"
                  aria-expanded="false"
                  class="nav-link"
                >
                  <span class="d-md-block">FREE MOVIES</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="popular_2 row mt-4">
            <div class="tab-content">
              <div class="tab-pane active" id="home">
                <div class="popular_2i row">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Semp Porta
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.2{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 49m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Eget Diam
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.3{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 2h 29m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="popular_2i row mt-4">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Quis Sem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.4{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 59m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Ipsum Lorem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.6{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 48m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="profile">
                <div class="popular_2i row">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Semp Porta
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.2{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 49m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Eget Diam
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.3{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 2h 29m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="popular_2i row mt-4">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Quis Sem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.4{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 59m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Ipsum Lorem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.6{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 48m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="settings">
                <div class="popular_2i row">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Semp Porta
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.2{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 49m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Eget Diam
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.3{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 2h 29m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="popular_2i row mt-4">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Quis Sem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.4{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 59m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Ipsum Lorem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.6{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 48m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="settings_o">
                <div class="popular_2i row">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Semp Porta
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.2{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 49m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Eget Diam
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.3{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 2h 29m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="popular_2i row mt-4">
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Quis Sem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.4{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 59m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="popular_2i1 row">
                      <div class="col-md-4 col-4">
                        <div class="popular_2i1lm position-relative clearfix">
                          <div class="popular_2i1lm1 clearfix">
                            <div class="grid">
                              <figure class="effect-jazz mb-0">
                                <a href="#">
                                  <img src={img6} class="w-100" alt="image6" />
                                </a>
                              </figure>
                            </div>
                          </div>
                          <div class="popular_2i1lm2 position-absolute top-0 w-100 text-center clearfix">
                            <ul>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-link col_red"></i>
                                </a>
                              </li>
                              <li class="d-inline-block">
                                <a href="#">
                                  <i class="fa fa-search col_red"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8 col-8">
                        <div class="popular_2i1r">
                          <h5>
                            <a class="col_red" href="#">
                              Ipsum Lorem
                            </a>
                          </h5>
                          <h6>Action, Thriller</h6>
                          <h6>
                            {" "}
                            Imdb 8.6{" "}
                            <span class="ms-2">
                              <i class="fa fa-star col_red me-1"></i>
                            </span>{" "}
                            Year : 2022{" "}
                            <span class="ms-2">Runtime: 1h 48m</span>
                          </h6>
                          <p>
                            Four waves of increasingly deadly alien attacks have
                            left most of ruin. Cassie is on the run, desperately
                            trying to save her younger brother.
                          </p>
                          <h6 class="mb-0">
                            <a class="button" href="#">
                              {" "}
                              More Info - Trailer
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
