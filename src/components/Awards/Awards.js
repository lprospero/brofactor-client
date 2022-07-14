import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAwards } from "../../actions/awards";
import { useDispatch } from 'react-redux';
import { Table, Fade, Col, Row, Container, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

const Awards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAwards());
    }, [dispatch]);
    const awards = useSelector((state) => state.awards);

    const hasContent = awards && awards.length > 0;
    const placeholder = !hasContent ? (
        <Container className="bro-awards-placeholder">
            <Row>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" bg="danger" />
                    </Placeholder>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} size="lg" bg="danger" />
                        <Placeholder xs={12} size="lg" bg="danger" />
                        <Placeholder xs={12} bg="danger" />
                        <Placeholder xs={12} size="sm" bg="danger" />
                        <Placeholder xs={12} size="sm" bg="danger" />
                        <Placeholder xs={12} size="sm" bg="danger" />
                        <Placeholder xs={12} size="sm" bg="danger" />
                        <Placeholder xs={12} size="xs" bg="danger" />
                        <Placeholder xs={12} size="xs" bg="danger" />
                        <Placeholder xs={12} size="xs" bg="danger" />
                        <Placeholder xs={12} size="xs" bg="danger" />
                        <Placeholder xs={12} size="xs" bg="danger" />
                        <Placeholder xs={12} size="xs" bg="danger" />
                    </Placeholder>
                </Col>
            </Row>
        </Container>
    ) : null;

    let awardRows = awards && awards.length > 0 && awards.map(award => (
        <tr key={"award_" + award._id}>
            <td><img height="60px" width="60px" alt={"award_" + award._id} src={award.avatar} /></td>
            <td><Link to={"/award/" + award._id}>{award.title}</Link></td>
            <td>{award.experience}</td>
            <td>{award.type}</td>
            <td>{award.note}</td>
        </tr>
    ))

    return (
        <div>
            {placeholder}
            <Fade in={hasContent}>
                <div className="bro-awards">
                    <Table striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Award</th>
                                <th>Title</th>
                                <th>Experience</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awardRows}
                        </tbody>
                    </Table>
                </div>
            </Fade>
        </div>
    );
}

export default Awards;