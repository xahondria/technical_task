import styled from 'styled-components';
import {formatNumber} from '../../common/utils/format-number';
import IconHeartRed from '../../common/icons/icon-heart-red';
import {useState} from 'react';
import IconHeartRedFilled from '../../common/icons/icon-heart-red-filled';

const StyledLikesButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;

  height: 40px;
  padding: 4px 12px;

  border: none;
  border-radius: 20px;
  background-color: transparent;

  color: inherit;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, .1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, .1);
  }

  &:active {
    background-color: rgba(255, 255, 255, .2);
  }
`;

function Likes() {

  const [ selected, setSelected ] = useState<boolean>(false);

  function handleClick(): void {
    setSelected(!selected);
  }

  return (
    <StyledLikesButton type="button"
                       onClick={ handleClick }>
      { selected ? <IconHeartRedFilled /> : <IconHeartRed /> }
      <span style={ {marginLeft: 8} }>{ formatNumber(1350) }</span>
    </StyledLikesButton>
  );
}

export default Likes;
