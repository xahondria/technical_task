import styled from 'styled-components';
import {formatNumber} from '../../common/utils/format-number';
import IconHeartGrey from '../../common/icons/icon-heart-grey';
import Post from './Post';
import {useGetAuthors} from '../../repositories/authors/authors.repository';
import {UseQueryResult} from 'react-query/types/react/types';
import {Author} from '../../repositories/authors/models/author.model';
import {useGetComments} from '../../repositories/comments/comments.repository';
import {Comment} from '../../repositories/comments/models/comment.model';
import {Collection} from '../../common/models/collection.model';

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

  font-weight: bold;
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

  cursor: pointer;

  &:focus {
    outline: none;

    &:not(:disabled) {
      background-color: rgba(255, 255, 255, .1);
    }
  }

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, .1);
  }

  &:active:not(:disabled) {
    background-color: rgba(255, 255, 255, .2);
  }

  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
`;

let currentPage = 0;
const loadedPages: Collection<Comment>[] = [];

function Comments() {

  const authorsList: UseQueryResult<Author[], unknown> = useGetAuthors();
  const commentsCollection: UseQueryResult<Collection<Comment>, unknown> = useGetComments(currentPage + 1);

  if (authorsList.isLoading || commentsCollection.isLoading) {
    return <div>Loading...</div>;
  }

  if (authorsList.error) {
    // TODO для такой обработки нужен notification service, или что-то подобное
    return <div>Error: { String(authorsList.error) }</div>;
  }

  if (commentsCollection.error) {
    console.error(commentsCollection.error);
    return (
      <StyledLayout>
        <div>Error: { String(commentsCollection.error) }</div>
        <StyledLoadButtonContainer className="container">
          <StyledLoadButton type="button"
                            onClick={ onLoadMoreClick }>Загрузить ещё</StyledLoadButton>
        </StyledLoadButtonContainer>
      </StyledLayout>
    );
  }

  currentPage = commentsCollection.data?.pagination.page || 0;

  const isLastPage = commentsCollection.data?.pagination.page === commentsCollection.data?.pagination.total_pages;

  if (commentsCollection.data && !loadedPages.find(page => page.pagination.page === commentsCollection.data.pagination.page)) {
    loadedPages.push(commentsCollection.data);
  }

  const postsTotal = getPostsTotal(loadedPages);
  const likesTotal = getLikesTotal(loadedPages);

  const comments: Array<Comment> = (loadedPages.flatMap(page => page.data))
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  const postsList = comments.map((comment) => {

    const author = authorsList.data?.find((author) => author.id === comment.author);

    return <StyledPost key={ comment.id }
                       date={ comment.created }
                       author={ author }
                       comment={ comment.text }
                       likes={ comment.likes } />;
  });

  function onLoadMoreClick(): void {
    commentsCollection.refetch()
      .catch((error) => console.error('Error:', error));
  }

  return (
    <StyledLayout>
      <section className="container">
        <StyledHeader>
          <span>{ formatNumber(postsTotal) } комментариев</span>
          <StyledLikes>
            <IconHeartGrey />
            <span style={ {marginLeft: 8} }>{ formatNumber(likesTotal) }</span>
          </StyledLikes>
        </StyledHeader>
        <StyledHr></StyledHr>
      </section>
      <section className="container">
        { postsList }
      </section>
      <StyledLoadButtonContainer className="container">
        {/*TODO commentsCollection.isLoading не обновляется при refetch*/ }
        <StyledLoadButton type="button"
                          disabled={ commentsCollection.isLoading || isLastPage }
                          onClick={ onLoadMoreClick }>Загрузить ещё</StyledLoadButton>
      </StyledLoadButtonContainer>
    </StyledLayout>
  );
}

function getPostsTotal(loadedPages: Collection<Comment>[]): number {
  // TODO: commentsCollection.data?.data.length не является числом всех комментариев, поскольку мы не запрашиваем сразу все страницы.
  //  Нужно соответствующее апи.
  return loadedPages.reduce((acc, page) => acc + page.data.length, 0);
}

function getLikesTotal(loadedPages: Collection<Comment>[]): number {
  // TODO: аналогично, нужно соответствующее апи для суммы всех лайков.
  return loadedPages.reduce((acc, page) => acc + page.data.reduce((acc, comment) => acc + comment.likes, 0), 0);
}

export default Comments;

