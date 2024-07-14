export interface Collection<T> {
  pagination: {
    page: number;
    size: number;
    total_pages: number;
  },
  data: Array<T>;
}
