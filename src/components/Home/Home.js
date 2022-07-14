import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getPlayer, clearPlayers } from "../../actions/players";
import { getAwards } from "../../actions/awards";
import Login from "./Login";
import Player from "../Players/Player";
import { Container, Col, Row, Table, ProgressBar, Spinner } from "react-bootstrap";

function getLevel(experience) {
    if (experience >= 5 && experience < 10) {
        return {
            level: 2,
            progress: (experience - 5) / 5 * 100
        }
    } else if (experience >= 10 && experience < 20) {
        return {
            level: 3,
            progress: (experience - 10) / 10 * 100
        }
    } else if (experience >= 20 && experience < 35) {
        return {
            level: 4,
            progress: (experience - 20) / 20 * 100
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
    const [randomNumber, setRandomNumber] = useState();
    const [showLoader, setShowLoader] = useState(true);
    let notes = [];

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomNumber(Math.floor(Math.random() * 100 + 1));
            setShowLoader(false);
        }, 10000
        );
        
        if (cookies && cookies.user) {
            dispatch(getPlayer(cookies.user.id));
        }
        dispatch(getAwards());
        return () => {
            dispatch(clearPlayers());
            clearInterval(interval);
        }
    }, [dispatch, cookies]);

    const awards = useSelector((state) => state.awards);
    let player = null;
    player = useSelector((state) => state.players);

    if (cookies.user) {

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

        const level = getLevel(experience);
        const randomNote = player && notes && notes.length > 0 ? (
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

        if (experience === 0 && showLoader) {
            return (
                <div className="bro-spinner">
                    <Spinner className="component" animation="border" variant="danger" />
                </div>
            );
        } else if (experience === 0 && !showLoader) {
            return (
                <div>
                    <div className="bro-welcome">
                        <h2>Let's get started!</h2>
                        <p>The idea behind the project is to save the good memories you have for your teammates. Did someone impress you with their sleek and elegant code submission? Somebody inspired you to give your 100% today? With the variety of awards, there's surely a badge you can give to remember these events!</p>
                        <p>Create memories and show appreciation, see how your peers look up to each other, and take pride with the commendations you receive from the team! Start using the app by going to <strong>Players > List</strong> and award someone who impressed you today.</p>
                    </div>
                </div>
            );
        } else if (experience !== 0) {            
            return (
                <div>
                    {randomNote}
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
        }
    } else {
        return (<Login />)
    }
}

export default Home;