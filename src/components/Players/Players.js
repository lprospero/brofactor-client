import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPlayers } from "../../actions/players";
import { useDispatch } from 'react-redux';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import { useCookies } from "react-cookie";

const Players = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPlayers());
    }, [dispatch]);
    const players = useSelector((state) => state.players);
    const rows = players.map && players.map(player => (
        <tr key={"player_" + player._id}>
            <td><img height="60px" width="60px" alt={"player_" + player._id} src={player.avatar} /></td>
            <td><Link to={"/player/" + player._id + "/award"}>{player.name}</Link></td>
            <td>{player.email}</td>
        </tr>
    ));

    const [cookies, setCookie] = useCookies();

    return (
        <div>
            <Table striped bordered hover size="sm">
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
    );
}

export default Players;