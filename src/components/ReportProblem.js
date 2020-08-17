import React, { useState } from 'react'
import Styled from "styled-components";

const Container = Styled.div`
    position: absolute;
    right: 1vw;
    bottom: 1vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #f3f3f3;
`;
const Form = Styled.form`
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #f3f3f3;
    ${props => props.show === false && "display: none;"}
`; 
const Input = Styled.input`
    color: #f3f3f3;
    border: none;
    outline: none;
    padding: 5px;
    border-radius: 3px;
    background: #679267;
    margin: 3px 0 10px 0;
`;
const Label = Styled.label``;
const Submit = Styled.button`
    background: #679267;
    border: none;
    outline: none;
    padding: 10px;
    color: #f3f3f3;
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
`;
const Toggle = Styled.div`
    position: absolute;
    bottom: 1vh;
    right: 1vw;
    background: #67926730;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    ${props => props.show && "right: 160px;"}
    &:hover {
    background: #67926770;
    }
`;

const ReportProblem = ({ email, targetLang, word, correctedWord }) => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                setStatus("SUCCESS");
                setTimeout(() => {
                    setShow(false);
                }, 3000)
            } else {
                setStatus("ERROR");
            }
        }
        xhr.send(data);
    };

    return (
        <Container>
            <Toggle show={show} onClick={() => setShow(!show)}>?</Toggle>
            <Form
                show={show}
                onSubmit={handleSubmit}
                action="https://formspree.io/xrgyjrob"
                method="POST"
            >
                <Label>Email:</Label>
                <Input type="email" name="email" />

                <Label>Language:</Label>
                <Input type="text" name="language" defaultValue={targetLang ? targetLang : ""} />

                <Label>Word:</Label>
                <Input type="text" name="word" defaultValue={word ? word : ""}/>

                <Label>Suggest correction:</Label>
                <Input type="text" name="suggestedcorrection" />

                {status === "SUCCESS" ? <Submit type="submit" disabled>Thanks!</Submit> : <Submit type="submit">Submit</Submit>}
            </Form>
        </Container>
    )
}

export default ReportProblem
