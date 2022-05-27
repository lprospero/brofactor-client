import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getPlayer, clearPlayers } from "../../actions/players";
import { getAwards } from "../../actions/awards";
import Login from "./Login";
import Player from "../Players/Player";
import { Container, Col, Row, Table, ProgressBar } from "react-bootstrap";

function getLevel(experience) {
    if (experience >= 5 && experience < 10) {
        return {
            level: 2,
            progress: (experience-5)/5 * 100
        }
    } else if (experience >= 10 && experience < 20) {
        return {
            level: 3,
            progress: (experience - 10) / 10 * 100
        }
    } else {
        return {
            level: 1,
            progress: experience/5 * 100
        }
    }
}


const Home = () => {

    const [cookies, setCookie] = useCookies(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cookies && cookies.user) {
            dispatch(getPlayer(cookies.user.id));
        }
        dispatch(getAwards());
        return () => {
            dispatch(clearPlayers());
        }
    }, [dispatch, cookies]);
    const awards = useSelector((state) => state.awards);
    const player = useSelector((state) => state.players);

    let awardsLookup = {};
    if (awards && awards.length > 0) {
        awards.map(award => {
            awardsLookup[award._id] = {
                avatar: award.avatar,
                title: award.title,
                experience: award.experience
            };
        });
    }
    
    let experience = 0;
    let notes = [];
    const playerAwards = {};
    if (player && player.awards && Object.keys(awardsLookup).length > 0) {
        for (let i in player.awards) {
            if (playerAwards[player.awards[i].award]) {
                playerAwards[player.awards[i].award]++;
            } else {
                playerAwards[player.awards[i].award] = 1;
            }
            if (player.awards[i].note) {
                notes.push(player.awards[i].note);
            }
            experience += awardsLookup[player.awards[i].award].experience;
        }
    }

    const welcome = experience === 0 ? (
        <div className="bro-welcome">
            <h2>Welcome!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    ): null;

    const level = getLevel(experience);
    const randomNote = notes && notes.length > 0 ? (
        <div className="bro-comment">
            <i>"{notes[Math.floor(Math.random() * notes.length)]}"</i>
        </div>
    ) : null;

    const rows = [];
    for (let award in playerAwards) {
        rows.push(
            <tr key={"award_" + award}>
                <td><img height="60px" width="60px" alt={"award_" + award} src={awardsLookup[award].avatar} /></td>
                <td>{awardsLookup[award].title}</td>
                <td>{playerAwards[award]}</td>
            </tr>
        );
    }

    if (cookies.user) {
        return (
            <div>
                { welcome }
                { randomNote }
                <div className="bro-player-awards">
                    <div className="bro-level">
                        <h2>Level {level.level}</h2>
                        <ProgressBar now={level.progress} />
                    </div>
                    <Table>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    } else {
        return (<Login />)
    }
}

export default Home;