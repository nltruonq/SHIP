import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SocketContext, socket } from './socket/socket';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import User from './pages/User/User';
import Game from './pages/Game/Game';
import { useEffect } from 'react';

import { sha256 } from 'js-sha256';

import axios from 'axios';

let body = {
    query: `
        mutation {
            generateShortLink(input:{
                originUrl:"https://shopee.vn/-M%C3%A3-BMLT35-gi%E1%BA%A3m-%C4%91%E1%BA%BFn-35K-%C4%91%C6%A1n-99K-A%CC%81o-Ni%CC%89-Nam-Th%C6%A1%CC%80i-Trang-Nhi%C3%AA%CC%80u-Ma%CC%80u-Tre%CC%89-Trung-ZERO-i.277746668.14521499642",
                subIds:["s1","s2","s3","s4","s5"]
            }) {
                shortLink
            }
        }
    `,
    variables: {},
};
let options = (timestamp) => ({
    url: 'https://open-api.affiliate.shopee.vn/graphql',
    method: 'POST',
    data: body,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `SHA256 Credential=${17315610027}, Signature=${sha256(
            17315610027 + timestamp + body + '2QTFKEUKCWXZ6VDQO66GOHDGPNC45F5A',
        )}, Timestamp=${timestamp}`,
    },
});

function App() {
    useEffect(() => {
        const getLink = async () => {
            const res = await axios(options(Math.floor(Date.now() / 1000)));
            console.log(res);
        };
        getLink();
    }, []);
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
