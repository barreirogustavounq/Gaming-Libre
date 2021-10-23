import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { getCategories } from "../../service/ProductService";
import { useHistory } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  const filterByCategory = (category) => {
    history.push(`/products/category/${category}/`);
  };

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <WrapperCategory>
      <Title>Categorias</Title>
      {categories.map((category) => (
        <CategoryButton onClick={() => filterByCategory(category)}>
          {category}
        </CategoryButton>
      ))}
    </WrapperCategory>
  );
};

export default Categories;

const Title = styled.h1`
  padding: 1em;
  color: white;
`;

const CategoryButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  text-decoration: underline;
`;

const WrapperCategory = styled.div`
  place-items: center;
  display: inline-grid;
  margin-right: 10em;
  border: 1px solid white;
  border-radius: 5px;
  background-color: transparent;
  color: white;
`;
