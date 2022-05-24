import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPlayer } from "../../actions/players";
import Players from "./Players";
import FileBase from "react-file-base64";

const Entry = () => {
    const [postData, setPostData] = useState({});
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPlayer(postData));
    };
    const players = useSelector((state) => state.players);

    const options = [];
    players.map(player => (
        options.push(
            { value: player._id, label: <div><img alt={ player._id } src={player.avatar} height="30px" width="30px" />&nbsp;{ player.title }</div> }
        )
    ));

    return (
        <div>
            <Players />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e) => setPostData({ ...postData, name: e.target.value })}></Form.Control>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => setPostData({ ...postData, email: e.target.value })}></Form.Control>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPostData({ ...postData, password: e.target.value })}></Form.Control>
                    <Form.Label>Avatar</Form.Label>
                    <FileBase type="file" multiple={ false } onDone={({ base64 }) => setPostData({ ...postData, avatar: base64 })}></FileBase>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Entry;