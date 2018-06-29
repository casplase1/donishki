import React from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import Gallery from 'react-grid-gallery';
import H2 from '../../generic/H2';
const Anchor = Scroll.Element;

const Wrapper = styled.div`
  background-color: #f5f5f6;
  padding: 40px 0;
`;

const GalleryContent = styled.div`
  padding-top: 20px;
  margin: 15px;
`;

const ClearBlock = styled.div`
  clear: both;
`;

const GalleryWrapper = styled.div`
  max-width: 967px;
  margin: 0 auto;
`;

const images =
  [
    {
      src: '/gallery/1.jpg',
      thumbnail: '/gallery/1.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/2.jpg',
      thumbnail: '/gallery/2.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/3.jpg',
      thumbnail: '/gallery/3.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/4.jpg',
      thumbnail: '/gallery/4.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/5.jpg',
      thumbnail: '/gallery/5.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/6.jpg',
      thumbnail: '/gallery/6.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
  ];

export default ({ handleWaypointEnter }) => (
  <Wrapper>
    <Anchor name="GalleryAnchor" />
    <GalleryWrapper>
      <Waypoint onEnter={handleWaypointEnter} />
      <H2>Примеры работ</H2>
      <GalleryContent>
        <Gallery images={images} enableImageSelection={false} rowHeight={250} />
        <ClearBlock />
      </GalleryContent>
    </GalleryWrapper>
  </Wrapper>
);