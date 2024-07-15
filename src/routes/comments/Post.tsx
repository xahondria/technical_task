import styled from 'styled-components';
import Likes from './Likes';
import {Comment} from '../../repositories/comments/models/comment.model';
import {Author} from '../../repositories/authors/models/author.model';

interface PostProps {
  className?: string;
  comment: Comment;
  allComments: Comment[];
  authors: Author[];
}

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
  object-fit: cover;

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
  font-weight: bold;
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

const StyledChildCommentsContainer = styled.div`
  margin-top: 24px;
  margin-left: 20px;

  @media screen and (min-width: 562px) {
    margin-top: 32px;
    margin-left: 34px;

  }
`;

function getCommentDate(isoDate: string | undefined): string {

  if (!isoDate) {
    return '';
  }

  const commentDate = new Date(isoDate);

  return commentDate.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

function Post({
                className,
                comment,
                allComments,
                authors,
              }: PostProps) {

  const author = authors.find((author) => author.id === comment.author);

  const childComments = allComments
    .filter((c) => c.parent === comment.id)
    .map((c) => Post({comment: c, allComments, authors}));

  console.log(childComments);

  return (
    <div>
      <StyledLayout className={ className }>
        <StyledAvatar src={ author?.avatar }
                      alt="avatar" />
        <StyledContent>
          <StyledHeader>
            <div>
              <StyledUsername>{ author?.name }</StyledUsername>
              <StyledDate>{ getCommentDate(comment.created) }</StyledDate>
            </div>
            <Likes likesNumber={ comment.likes ?? 0 } />
          </StyledHeader>
          <StyledComment>{ comment.text }</StyledComment>
        </StyledContent>
      </StyledLayout>
      <StyledChildCommentsContainer>
        { childComments }
      </StyledChildCommentsContainer>
    </div>
  );
}

export default Post;

