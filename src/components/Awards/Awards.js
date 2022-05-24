import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAwards } from "../../actions/awards";
import { useDispatch } from 'react-redux';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Awards = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAwards());
    }, [dispatch]);
    const awards = useSelector((state) => state.awards);

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Award</th>
                        <th>Title</th>
                        <th>Experience</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {awards.map(award => (
                        <tr key={ "award_"+award._id }>
                            <td><img height="60px" width="60px" alt={"award_" + award._id} src={award.avatar} /></td>
                            <td><Link to={"/award/"+award._id}>{award.title}</Link></td>
                            <td>{award.experience}</td>
                            <td>{award.type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Awards;