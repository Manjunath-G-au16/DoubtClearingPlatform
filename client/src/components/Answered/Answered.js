import React, { useEffect, useState } from 'react'
import Heading from '../Common/Heading/Heading';
import { useHistory } from "react-router-dom";
import "./Answered.scss"

const Answered = () => {
    const [doubts, setDoubts] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory();
    const callAnsDoubts = async () => {
        try {
            const res = await fetch("/answered", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            setLoading(false);
            setDoubts(data);
            console.log(data);
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            history.push("/");
        }
    };
    useEffect(() => {
        callAnsDoubts();
    }, [])
    return (
        <>
            <Heading heading="Answered" />
            
            <div className="answered-sec">
                <h1>You Answered Doubts</h1>
            {(loading === true) && <h3>Loading....</h3>}
                {
                    doubts.map((item, index) => {
                        return (
                            <div key={index} className="ans-sec">
                                <h3>{item.question}</h3>
                                <h4>{item.answer}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Answered
