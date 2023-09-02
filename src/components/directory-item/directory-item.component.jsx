// import "./directory-item.styles.scss";
import { useNavigate } from "react-router-dom";
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";

import React from "react";

const DirectoryItem = ({ category }) => {

    const {imageUrl, title, route} = category;

    const navigate = useNavigate()

    const onNavigatehangler = () => navigate(route)

  return (
    <DirectoryItemContainer onClick={onNavigatehangler}>
      <BackgroundImage
        imageUrl = {imageUrl}
        // style={{
        //   backgroundImage: `url(${imageUrl})`,
        // }}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
