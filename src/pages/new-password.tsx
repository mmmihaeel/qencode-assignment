import { FC, useEffect } from "react";
import NewPasswordForm from "../components/NewPasswordForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const NewPasswordPage: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchParams.get('token') || !searchParams.get('secret')) {
            navigate('/login')
        }
    }, [navigate, searchParams])

    return <NewPasswordForm />
}

export default NewPasswordPage;