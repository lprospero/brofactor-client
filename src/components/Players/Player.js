import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Placeholder, Fade } from "react-bootstrap";
import { useCookies } from "react-cookie";


const Player = () => {
    const { playerid } = useParams();
    const dispatch = useDispatch();

    const player = useSelector((state) => state.players);
    const [cookies, setCookie] = useCookies();
    const hasContent = player && player.name;
    const placeholder = !hasContent ? (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    ): null;

    return (
        <div className="bro-player">
            {placeholder}
            <Fade in={!!hasContent}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={player.avatar} />
                    <Card.Body>
                        <Card.Title>{player.name}</Card.Title>
                        <Card.Text>{player.email}</Card.Text>
                    </Card.Body>
                </Card>
            </Fade> 
        </div>
    );
    
}

export default Player;