import React from 'react';
import styled from 'styled-components';
import Waypoint from 'react-waypoint';
import Gallery from 'react-grid-gallery';
import H2 from '../../generic/H2';

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

const images = [
  {
    src: '/examples/1.jpg',
    thumbnail: '/examples/thumbnail/1.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/2.jpg',
    thumbnail: '/examples/thumbnail/2.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/3.jpg',
    thumbnail: '/examples/thumbnail/3.jpg',
    thumbnailWidth: 278,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/4.jpg',
    thumbnail: '/examples/thumbnail/4.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/5.jpg',
    thumbnail: '/examples/thumbnail/5.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/6.jpg',
    thumbnail: '/examples/thumbnail/6.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/7.jpg',
    thumbnail: '/examples/thumbnail/7.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/8.jpg',
    thumbnail: '/examples/thumbnail/8.jpg',
    thumbnailWidth: 250,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/9.jpg',
    thumbnail: '/examples/thumbnail/9.jpg',
    thumbnailWidth: 350,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/10.jpg',
    thumbnail: '/examples/thumbnail/10.jpg',
    thumbnailWidth: 350,
    thumbnailHeight: 250,
  },
  {
    src: '/examples/12.jpg',
    thumbnail: '/examples/thumbnail/12.jpg',
    thumbnailWidth: 350,
    thumbnailHeight: 250,
  },
];

export default ({ handleWaypointEnter }) => (
  <Wrapper>
    <GalleryWrapper>
      <Waypoint onEnter={handleWaypointEnter} />
      <H2>Донышки из трикотажной пряжи</H2>
      <GalleryContent>
        <Gallery images={images} enableImageSelection={false} rowHeight={250} />
        <ClearBlock />
      </GalleryContent>
    </GalleryWrapper>
  </Wrapper>
);
