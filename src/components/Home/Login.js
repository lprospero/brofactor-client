import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../../actions/users";
import { useCookies } from "react-cookie";

const Login = () => {
    const [postData, setPostData] = useState({});
    const [cookies, setCookie] = useCookies({});
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(validateUser(postData));
    };
    const user = useSelector((state) => state.users);
    useEffect(() => {
        if (user && user._id) {
            setCookie("user", { id: user._id, name: user.name, email: user.email }, {
                path: "/"
            });
        }
    }, [user]);

    if (user.error) {
        return (
            <div className="bro-login">
                <Alert key="danger" variant="danger">
                    {user.error}
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => setPostData({ ...postData, email: e.target.value })}></Form.Control>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPostData({ ...postData, password: e.target.value })}></Form.Control>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    } else {
        return (
            <div className="bro-login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => setPostData({ ...postData, email: e.target.value })}></Form.Control>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPostData({ ...postData, password: e.target.value })}></Form.Control>
                    </Form.Group><br />
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
    
}

export default Login;