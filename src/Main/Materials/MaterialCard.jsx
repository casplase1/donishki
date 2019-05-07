import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  height: 280px;
  padding-top: 15px;
  @media (min-width: 768px) {
    height: 350px;
    padding-top: 15px;
  }
`;

const Background = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-image: url(${({ image }) => image});
  position: relative;
  background-size: cover;
  height: 100%;
`;

const Name = styled.h3`
  color: #fff;
  font-family: 'Roboto',sans-serif;
  font-size: 38px;
  margin: 20px 0;
`;

const Description = styled.p`
  opacity: 0.8;
  font-family: 'Roboto',sans-serif;
  font-size: 18px;
  color: #fff;
  margin: 0;
  padding: 0 20px;
`;

const Shadow = styled.div`
  border-radius: 5px;
  background: linear-gradient(to bottom, transparent, black) no-repeat bottom;
  background-size: 100% 130%;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Section = styled.section`
  padding-top: 80px;
  @media (min-width: 768px) {
    padding-top: 120px;
    transition: .2s;
    &:hover {
      padding-top: 115px;
    }
  }
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export default ({
  name,
  description,
  onClick,
  image,
}) => (
  <Wrapper>
    <Background image={image} onClick={onClick}>
      <Shadow />
      <CardContent>
        <Section>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </Section>
      </CardContent>
    </Background>
  </Wrapper>
);
