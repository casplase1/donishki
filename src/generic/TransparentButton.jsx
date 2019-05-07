import styled from 'styled-components';

export default styled.button`
  border-radius: 20px;
  border: solid 1px #222222;
  background: none;
  padding: 8px 10px;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  color: #222222;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #3b3b3b;
    color: #fff
  }
  
  @media (min-width: 768px) {
    font-size: 14px;
    padding: 8px 20px;
  }
`;
