import React, { FC, lazy } from "react";
const ForgotPasswordForm = lazy(() => import("../components/ForgotPasswordForm"));

const ForgotPasswordPage: FC = () => {
    return <React.Fragment>
        <ForgotPasswordForm />
    </React.Fragment>;
}

export default ForgotPasswordPage;