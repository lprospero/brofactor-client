import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import Home from "./components/Home/Home";
import Login from "./components/Home/Login";
import NavBar from "./components/NavBar/NavBar";
import Awards from "./components/Awards/Awards";
import AwardForm from "./components/Awards/Entry";
import Players from "./components/Players/Players";
import PlayerAward from "./components/Players/PlayerAward";
import PlayerForm from "./components/Players/Entry";

const App = () => {

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/awards" element={<Awards />} />
                <Route path="/awards/new" element={<AwardForm />} />
                <Route path="/players" element={<Players />} />
                <Route path="/players/new" element={<PlayerForm />} />
                <Route path="/player/:playerid/award" element={<PlayerAward />} />
            </Routes>
        </div>
    );
}

export default App;
