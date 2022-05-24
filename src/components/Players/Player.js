import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlayer } from "../../actions/players";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { useCookies } from "react-cookie";


const Player = () => {
    const { playerid } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayer(playerid));
    }, [dispatch, playerid]);
    const player = useSelector((state) => state.players);
    const [cookies, setCookie] = useCookies();

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={player.avatar} />
                <Card.Body>
                    <Card.Title>{player.name}</Card.Title>
                    <Card.Text>{player.email}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Player;