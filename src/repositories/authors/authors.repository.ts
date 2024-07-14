import {useQuery} from 'react-query';
import getAuthorsRequest from '../../api/authors/getAuthorsRequest';
import {UseQueryResult} from 'react-query/types/react/types';
import {Author} from './models/author.model';

export function useGetAuthors(): UseQueryResult<Author[], unknown> {
  return useQuery('authors', () => getAuthorsRequest());
}
