import React, { FC, lazy } from "react";
const LoginForm = lazy(() => import("../components/LoginForm"));

const LoginPage: FC = () => {
    return <React.Fragment>
        <LoginForm />
    </React.Fragment>;
}

export default LoginPage;