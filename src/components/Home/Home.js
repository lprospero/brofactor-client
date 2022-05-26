import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getPlayer } from "../../actions/players";
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
    }, [dispatch, cookies]);
    const awards = useSelector((state) => state.awards);
    const player = useSelector((state) => state.players);

    let awardsLookup = {};
    awards.map(award => {
        awardsLookup[award._id] = {
            avatar: award.avatar,
            title: award.title,
            experience: award.experience
        };
    });

    let experience = 0;
    const playerAwards = {};
    if (player && player.awards && Object.keys(awardsLookup).length > 0) {
        for (let i in player.awards) {
            if (playerAwards[player.awards[i].award]) {
                playerAwards[player.awards[i].award]++;
            } else {
                playerAwards[player.awards[i].award] = 1;
            }
            experience += awardsLookup[player.awards[i].award].experience;
        }
    }
    const level = getLevel(experience);
    console.log(experience);
    console.log(level);


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
            <Container>
                <Row className="bro-row">
                    <Col className="bro-player-col">
                        <Player />
                    </Col>
                    <Col className="bro-form">
                        <div className="bro-level">
                            <h2>Level {level.level}</h2>
                            <ProgressBar now={level.progress} />
                        </div>
                        <Table>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (<Login />)
    }
}

export default Home;