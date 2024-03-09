import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MainPage: FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (!Cookies.get('accessToken') && !Cookies.get('refreshToken')) {
            setMessage('You are not logged in. Redirecting...')
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        } else {
            setMessage('You are succesfully logged in to Qencode!')
        }

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