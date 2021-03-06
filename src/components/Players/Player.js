import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Placeholder, Fade, Image, Container, Row, Col } from "react-bootstrap";
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

    const playerAwards = player && player.name ? (
        player.awards
            .filter(award => award.sponsor !== cookies.user.id)
            .map(({ note, dateCreated }) => {
                return (
                    <div key={dateCreated.toString()}  className="bro-comment" style={{ marginBottom: "5px" }}>
                            <i>"{note}"</i>
                    </div>
                )
            })
        ).reverse() : null;

    return (
        <div className="bro-player">
            {placeholder}
            <Fade in={!!hasContent}>
                <div>
                    <div className="bro-profile" style={{ marginBottom: "10px" }}>
                        <Container>
                            <Row>
                                <Col md="auto">
                                    <Image rounded height="100px" width="100px" className="bro-pic" src={player.avatar} />
                                </Col>
                                <Col>
                                    <h2>{player.name}</h2>{player.email}
                                </Col>
                            </Row>
                        
                        </Container>
                    </div>
                    {playerAwards}
                </div>
            </Fade> 
        </div>
    );
    
}

export default Player;