import React from "react";
import axios from "axios";
import styled from "styled-components";
import { baseURL } from "../redux/store";
import { Link } from "react-router-dom";
import { ButtonOutline } from "./Buttons";
import Loader from "./Loader";

export const Articles = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/articles`)
      .then((res) => {
        console.log(res);
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const shuffledArticles = shuffleArray(articles);
  const selectedArticles = shuffledArticles.slice(0, 4);

  if(loading){
    return <Loader></Loader>
  }

  return (
    <ARTICLES>
      {selectedArticles.map((article) => (
        <ARTICLECARD key={article.id}>
          {/* Render your article details here */}
          <img src={article.image} />
          <div>
            <h4>{article.title}</h4>
            <p>{article.article}</p>
            <Link to={article.link} target="_blank" className="article-link">
              {" "}
              <ButtonOutline>Visit Article</ButtonOutline>
            </Link>
          </div>
        </ARTICLECARD>
      ))}
    </ARTICLES>
  );
};

const ARTICLES = styled.div`
  margin-top: 1rem;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const ARTICLECARD = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--background-light);
    color: var(--primary-white);
  }
  img {
    object-fit: cover;
    max-height: 300px;
    width: 100%;
    margin-bottom: 1rem;
  }
  h4 {
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }
  p {
    opacity: 0.75;
    margin-bottom: 1rem;
  }
  > div {
    padding: 1rem;
  }
  // Define your styles for the article card here
`;
