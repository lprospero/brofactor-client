import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAward, clearAwards } from "../../actions/awards";
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
            dispatch(createAward(postData));
        }
        
    };
    useEffect(() => {
        // unmount component
        return () => {
            dispatch(clearAwards());
        }
    }, [])
    const award = useSelector((state) => state.awards);

    const banner = award && award.title && !isTyping ? (
        <Alert key="success" variant="success">
            {award.title} was successfully created!
        </Alert>
    ) : null;

    return (
        <div className="bro-form">
            { banner }
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, title: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Experience</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, experience: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Type</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, type: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Description</Form.Label>
                    <Form.Control required onChange={(e) => { setPostData({ ...postData, note: e.target.value }); setIsTyping(true); }}></Form.Control>
                    <Form.Label>Avatar</Form.Label>
                    <div className="bro-avatar">
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => { setPostData({ ...postData, avatar: base64 }); setIsTyping(true); }}></FileBase>
                    </div>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Entry;