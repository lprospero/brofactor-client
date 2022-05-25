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
                            {awards.map(award => (
                                <tr key={ "award_"+award._id }>
                                    <td><img height="60px" width="60px" alt={"award_" + award._id} src={award.avatar} /></td>
                                    <td><Link to={"/award/"+award._id}>{award.title}</Link></td>
                                    <td>{award.experience}</td>
                                    <td>{award.type}</td>
                                    <td>{award.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Fade>
        </div>
    );
}

export default Awards;