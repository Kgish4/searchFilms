import { CloseCircleOutlined } from "@ant-design/icons";
import { Card, Row } from "antd";
import Meta from "antd/es/card/Meta";
import React, { FC, Fragment } from "react";
import { FilmCard } from "../../types/types";

interface IList {
  cards: FilmCard[];
  closeCard?: (id: string) => void;
}

const List: FC<IList> = ({ cards, closeCard }) => {
  return (
    <Row
      style={{
        margin: "5px",
        justifyContent: "center",
      }}
      gutter={33}
    >
      {cards.map((film) => {
        return (
          <Fragment key={film.id}>
            <Card
              hoverable
              style={{ width: 240, margin: "5px" }}
              cover={<img alt="film" src={film.poster} />}
            >
              {!!closeCard && (
                <CloseCircleOutlined
                  onClick={() => closeCard(film.db_id as string)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    fontSize: "28px",
                  }}
                  key="delete"
                />
              )}
              <Meta
                title={film.name}
                description={`imdb: ${film.rating?.imdb}; kp: ${film.rating?.kp}`}
              />
            </Card>
          </Fragment>
        );
      })}
    </Row>
  );
};

export default List;
