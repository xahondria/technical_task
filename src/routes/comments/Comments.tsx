import styled from 'styled-components';
import {formatNumber} from '../../common/utils/format-number';
import IconHeartGrey from '../../common/icons/icon-heart-grey';
import Post from './Post';

const StyledLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    padding-top: 32px;
    padding-bottom: 76px;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;

    overflow-y: auto;

    background-color: rgba(16, 31, 37, .3);

    @media screen and (min-width: 562px) {
      padding-top: 52px;
      padding-bottom: 64px;
    }
  `;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    font-weight: 500;
  `;

const StyledLikes = styled.span`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
  `;

const StyledHr = styled.hr`
    width: 100%;
    border: .2px solid #767676;
  `;

const StyledPost = styled(Post)`
    margin-top: 32px;
  `;

const StyledLoadButtonContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 60px;
  `;

const StyledLoadButton = styled.button`
  height: 36px;
  width: 234px;
  padding: 0 12px;

  border: none;
  border-radius: 4px;
  background-color: #313439;

  color: inherit;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  line-height: 36px;
  text-align: center;
  vertical-align: center;

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

function Comments() {

  return (
    <StyledLayout>
      <section className="container">
        <StyledHeader>
          <span>{ formatNumber(2672) } комментариев</span>
          <StyledLikes>
            <IconHeartGrey />
            <span style={ {marginLeft: 8} }>{ formatNumber(8631231235) }</span>
          </StyledLikes>
        </StyledHeader>
        <StyledHr></StyledHr>
      </section>
      <section className="container">
        <StyledPost />
        <StyledPost />
        <StyledPost />
      </section>
      <StyledLoadButtonContainer className="container">
        <StyledLoadButton>Загрузить ещё</StyledLoadButton>
      </StyledLoadButtonContainer>
    </StyledLayout>
  );
}

export default Comments;

