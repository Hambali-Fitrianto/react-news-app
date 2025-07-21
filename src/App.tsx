import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './presentation/pages/Home';
import Detail from './presentation/pages/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
