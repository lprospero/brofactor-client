import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { awardPlayer, getPlayer } from "../../actions/players";
import { getAwards } from "../../actions/awards";
import { useDispatch } from 'react-redux';
import { Form, Button, Container, Col, Row, Table } from "react-bootstrap";
import Select from "react-select";
import { useParams } from 'react-router-dom';
import Player from "./Player";
import { useCookies } from "react-cookie";


const PlayerAward = () => {
    const [cookies, setCookie] = useCookies();
    const { playerid } = useParams();
    const [postData, setPostData] = useState({ player: playerid, sponsor: cookies.user});
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(awardPlayer(postData));
    };
    useEffect(() => {
        dispatch(getAwards());
        dispatch(getPlayer(playerid));
    }, [dispatch, playerid]);
    const awards = useSelector((state) => state.awards);
    const player = useSelector((state) => state.players);

    let awardsLookup = {};
    const options = [];
    awards.map(award => {
        options.push(
            { value: award._id, label: <div><img alt={award._id} src={award.avatar} height="30px" width="30px" />&nbsp;{award.title}</div> }
        );
        awardsLookup[award._id] = {
            avatar: award.avatar,
            title: award.title
        };
    });

    const rows = Object.keys(awardsLookup).length > 0 && player.awards && player.awards.map(sponsorship => (
        <tr key={"award_" + sponsorship.award + "_" + sponsorship.dateCreated}>
            <td><img height="60px" width="60px" alt={"award_" + sponsorship.award} src={awardsLookup[sponsorship.award].avatar} /></td>
            <td>{awardsLookup[sponsorship.award].title}</td>
            <td>{sponsorship.dateCreated}</td>
        </tr>
    ));

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Player />
                    </Col>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Select options={options} onChange={(e) => setPostData({ ...postData, award: e.value })}></Select>
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Award</th>
                                    <th>Title</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PlayerAward;