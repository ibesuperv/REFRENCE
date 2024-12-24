import { Route, Routes } from "react-router-dom";
import Holder from "./Holder";
import News from "./components/News/News";
import Ai from "./components/Ai/Ai";
import History from "./History";
import FullHistory from "./components/history/FullHistory";

export default function App() {
  return (



    <div className='w-full min-h-screen bg-black text-white text-center'>

    <Routes>
<Route path='/' element={<Holder/>} />
<Route path='/news' element={<News/>} />
<Route path='/ai' element={<Ai/>} />
<Route path='/history' element={<History/>} />
<Route path='/fullhistory' element={<FullHistory/>} />

    </Routes>
    </div>
  );
}
