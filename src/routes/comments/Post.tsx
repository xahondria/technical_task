import styled from 'styled-components';
import Likes from './Likes';
import {Comment} from '../../repositories/comments/models/comment.model';
import {Author} from '../../repositories/authors/models/author.model';

interface PostProps {
  className?: string;
  comment: Comment;
  allComments: Comment[];
  authors: Author[];
  onLikeSelectionChange: (selected: boolean) => void;
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

  const hoursPassed = Math.floor((new Date().getTime() - commentDate.getTime()) / 1000 / 60 / 60);

  if (hoursPassed <= 1) {
    return '1 час назад';
  }

  if (hoursPassed > 1 && hoursPassed <= 2) {
    return `2 часа назад`;
  }

  if (hoursPassed > 2 && hoursPassed <= 3) {
    return `3 часа назад`;
  }

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
                onLikeSelectionChange,
              }: PostProps) {

  const author = authors.find((author) => author.id === comment.author);

  const childComments = allComments
    .filter((c) => c.parent === comment.id)
    .map((c) => <Post
      key={ c.id }
      comment={ c }
      allComments={ allComments }
      authors={ authors }
      onLikeSelectionChange={ onLikeSelectionChange } />,
    );

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
            <Likes likesNumber={ comment.likes ?? 0 }
                   onLikeSelectionChange={ onLikeSelectionChange } />
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

