import Sidebar from './components/Sidebar';
import Main from './layouts/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex bg-[#333333]">
        <Sidebar />
        <Main />
      </div>
    </QueryClientProvider>
  );
}

export default App;
