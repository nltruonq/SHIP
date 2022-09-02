import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SocketContext, socket } from './socket/socket';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import User from './pages/User/User';
import Game from './pages/Game/Game';

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/game" element={<Game />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </SocketContext.Provider>
    );
}

export default App;
