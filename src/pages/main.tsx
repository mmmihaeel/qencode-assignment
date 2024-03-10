import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MainPage: FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        let timeoutId: number;

        if (!Cookies.get('accessToken') && !Cookies.get('refreshToken')) {
            setMessage('You are not logged in. Redirecting...')
            timeoutId = setTimeout(() => {
                navigate('/login');
            }, 2000)
        } else {
            setMessage('You are succesfully logged in to Qencode!')
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [navigate])

    return <React.Fragment>
        <main className={"container"}>
            <div className={'message'}>
                {message}
            </div>
        </main>
    </React.Fragment>;
}

export default MainPage;