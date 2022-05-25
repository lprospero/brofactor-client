import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlayers } from "../../actions/players";
import { useDispatch } from 'react-redux';
import { Table, Spinner, Container, Row, Col, Placeholder, Fade } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import { useCookies } from "react-cookie";

const Players = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);
    const players = useSelector((state) => state.players);
    const rows = players && players.length > 0 && players.map(player => (
        <tr key={"player_" + player._id}>
            <td><img height="60px" width="60px" alt={"player_" + player._id} src={player.avatar} /></td>
            <td><Link to={"/player/" + player._id + "/award"}>{player.name}</Link></td>
            <td>{player.email}</td>
        </tr>
    ));
    const [cookies, setCookie] = useCookies();

    const hasContent = players && players.length > 0;
    const placeholder = !hasContent ? (
        <Container>
            <Row>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                    </Placeholder>
                </Col>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                    </Placeholder>
                </Col>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                    </Placeholder>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                        <Placeholder xs={12} />
                        <Placeholder xs={12} size="sm" />
                        <Placeholder xs={12} size="xs" />
                    </Placeholder>
                </Col>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                        <Placeholder xs={12} />
                        <Placeholder xs={12} size="sm" />
                        <Placeholder xs={12} size="xs" />
                    </Placeholder>                    </Col>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" />
                        <Placeholder xs={12} />
                        <Placeholder xs={12} size="sm" />
                        <Placeholder xs={12} size="xs" />
                    </Placeholder>
                </Col>
            </Row>
        </Container>
    ) : null;

    return (
        <div>
            { placeholder }
            <Fade in={hasContent}>
                <div className="bro-players">
                    <Table striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Player</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </div>
            </Fade>
        </div>
    );
    
}

export default Players;