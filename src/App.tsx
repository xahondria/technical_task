import Comments from './routes/comments/Comments';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <Comments />
    </QueryClientProvider>
  );
}

export default App;
