import styled from "styled-components";
import Likes from "./Likes";

const StyledLayout = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    gap: 20px;
  `;

const StyledAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #000;

    flex-shrink: 0;
    flex-grow: 0;

    @media screen and (min-width: 562px) {
      width: 68px;
      height: 68px;
    }
  `;

const StyledContent = styled.div`
    flex-grow: 1;
  `;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    height: 40px;

    @media screen and (min-width: 562px) {
      height: 68px;
    }
  `;

const StyledUsername = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
  `;

const StyledDate = styled.div`
    font-size: 16px;
    color: #8297AB;
  `;

const StyledComment = styled.div`

  margin-top: 8px;

  @media screen and (min-width: 562px) {
    margin-top: 0;
  }
`;

function Post({className}: {className?: string}) {

  return (
    <StyledLayout className={ className }>
      <StyledAvatar src="https://via.placeholder.com/32"
                    alt="avatar" />
      <StyledContent>
        <StyledHeader>
          <div>
            <StyledUsername>username</StyledUsername>
            <StyledDate>1 час назад</StyledDate>
          </div>
          <Likes />
        </StyledHeader>
        <StyledComment>
          В Календаре появятся более десятка квестов – охота на зомби, битвы с боссами, ритуалы и разное другое. В том числе, там будет целая категория событий, за выполнение.
        </StyledComment>
      </StyledContent>
    </StyledLayout>
  );
}

export default Post;

