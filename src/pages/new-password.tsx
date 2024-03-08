import React, { FC, lazy } from "react";
const NewPasswordForm = lazy(() => import("../components/NewPasswordForm"));

const NewPasswordPage: FC = () => {
    return <React.Fragment>
        <NewPasswordForm />
    </React.Fragment>;
}

export default NewPasswordPage;