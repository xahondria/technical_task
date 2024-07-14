import {useQuery} from 'react-query';
import {UseQueryResult} from 'react-query/types/react/types';
import getCommentsRequest from '../../api/comments/getCommentsRequest';
import {Comment} from './models/comment.model';
import {Collection} from '../../common/models/collection.model';

export function useGetComments(page: number): UseQueryResult<Collection<Comment>, unknown> {
  return useQuery('comments', () => getCommentsRequest(page));
}
