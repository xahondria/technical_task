import styled from 'styled-components';
import {formatNumber} from '../../common/utils/format-number';
import IconHeartRed from '../../common/icons/icon-heart-red';
import {useState} from 'react';
import IconHeartRedFilled from '../../common/icons/icon-heart-red-filled';

interface LikesProps {
  likesNumber: number;
  onLikeSelectionChange: (selected: boolean) => void;
}

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
  font-weight: bold;
  line-height: 1.5;

  cursor: pointer;

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

function Likes({
                 likesNumber,
                 onLikeSelectionChange,
               }: LikesProps) {

  const [ selected, setSelected ] = useState<boolean>(false);
  const [ likes, setLikes ] = useState<number>(likesNumber);

  function handleClick(): void {
    setSelected(!selected);
    // TODO нужно апи для обновления количества лайков
    if (selected) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    onLikeSelectionChange(selected);
  }

  return (
    <StyledLikesButton type="button"
                       onClick={ handleClick }>
      { selected ? <IconHeartRedFilled /> : <IconHeartRed /> }
      <span style={ {marginLeft: 8} }>{ formatNumber(likes) }</span>
    </StyledLikesButton>
  );
}

export default Likes;
