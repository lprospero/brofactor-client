import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createAward } from "../../actions/awards";
import FileBase from "react-file-base64";
import Select from "react-select";

const Entry = () => {
    const [postData, setPostData] = useState({});
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createAward(postData));
    };
    const awards = useSelector((state) => state.awards);

    const options = [];
    awards.map(award => (
        options.push(
            { value: award._id, label: <div><img alt={ award._id } src={award.avatar} height="30px" width="30px" />&nbsp;{ award.title }</div> }
        )
    ));

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={(e) => setPostData({ ...postData, title: e.target.value })}></Form.Control>
                <Form.Label>Experience</Form.Label>
                <Form.Control onChange={(e) => setPostData({ ...postData, experience: e.target.value })}></Form.Control>
                <Form.Label>Type</Form.Label>
                <Form.Control onChange={(e) => setPostData({ ...postData, type: e.target.value })}></Form.Control>
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={(e) => setPostData({ ...postData, note: e.target.value })}></Form.Control>
                <Form.Label>Avatar</Form.Label>
                <FileBase type="file" multiple={ false } onDone={({ base64 }) => setPostData({ ...postData, avatar: base64 })}></FileBase>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default Entry;