import React, { FC, Fragment } from "react";
import FilmDto, { Video } from "../../dto/filmdto";

type IVideos = { teasers: Video[]; trailers: Video[] };

const generateList = (videos: Video[], videoName: string) =>
  videos.length > 0 ? (
    <Fragment key={videoName}>
      <p>{videoName}: </p>
      {videos.map((video, index) => (
        <a key={video.url + index} href={video.url} target="_blank">
          {video.site}: {video.name}
        </a>
      ))}
    </Fragment>
  ) : null;

const Videos: FC<IVideos> = ({ teasers, trailers }) => {
  return (
    <>
      {generateList(teasers, "Tisers")}
      {generateList(trailers, "Trailers")}
    </>
  );
};

export default Videos;
