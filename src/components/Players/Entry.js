import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPlayer, clearPlayers } from "../../actions/players";
import FileBase from "react-file-base64";

const Entry = () => {
    const [postData, setPostData] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if (postData.avatar) {
            setIsTyping(false);
            e.preventDefault();
            e.target.reset();
            dispatch(createPlayer(postData));
        }
    };
    const player = useSelector((state) => state.players);

    useEffect(() => {
        // unmount component
        return () => {
            dispatch(clearPlayers());
        }
    }, []);

    const banner = player && player.name && !isTyping ? (
        <Alert key="success" variant="success">
            {player.name} was successfully created!
        </Alert>
    ) : null;

    return (
        <div className="bro-form">
            { banner }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, name: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, email: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, password: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Avatar</Form.Label><br />
                    <div className="bro-avatar">
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => { setPostData({ ...postData, avatar: base64 }); setIsTyping(true); }}></FileBase>
                    </div>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Entry;