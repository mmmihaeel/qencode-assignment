import React, { FC, useEffect, useState } from "react";
import './index.scss'
import Logo from "../UI/logo";
import { ErrorResponse, NewPasswordDto } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "../../utils/validation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Api } from "../../services";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../UI/button";
import Input from "../UI/Input";

const NewPasswordForm: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [newPasswordLoading, setNewPasswordLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<
        {
            loc: string[];
            msg: string;
            type: string;
        }[]
    >([]);

    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const togglePasswordShown = () => {
        setPasswordShown((prev) => !prev);
    };
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false);
    const toggleConfirmPasswordShown = () => {
        setConfirmPasswordShown((prev) => !prev);
    };

    const newPasswordForm = useForm<NewPasswordDto>({
        mode: "onChange",
        resolver: zodResolver(NewPasswordSchema),
    });

    const onSubmit: SubmitHandler<NewPasswordDto> = async (dto: NewPasswordDto) => {
        try {
            setNewPasswordLoading(true);
            setErrors([]);
            setErrorMessage("");
            const { error } = await Api().auth.setNewPassword({
                password: dto.password,
                password_confirm: dto.confirmPassword,
                token: String(searchParams.get('token')),
                secret: String(searchParams.get('secret')),
            })
            if (!error) {
                setSuccessMessage('Password was succesfully updated!')
                setTimeout(() => {
                    navigate('/login');
                }, 4000);
            }
        } catch (err) {
            if (typeof (err as ErrorResponse)?.detail === "string") {
                setErrorMessage(String((err as ErrorResponse)?.detail));
            }
            if (Array.isArray((err as ErrorResponse)?.detail)) {
                setErrors(
                    (err as ErrorResponse)?.detail as {
                        loc: string[];
                        msg: string;
                        type: string;
                    }[]
                );
            }
            setNewPasswordLoading(false);
        }
    }

    useEffect(() => {
        if (!searchParams.get('token') || !searchParams.get('secret')) {
            navigate('/login')
        }
    }, [navigate, searchParams])

    return <React.Fragment>
        <main className={"container newPassword"} id='new-password'>
            <div className={"newPassword"}>
                <Logo />
                <h1 className={"title"}>Create new Password?</h1>
                <FormProvider {...newPasswordForm}>
                    <form
                        onSubmit={newPasswordForm.handleSubmit(onSubmit)}
                        className={"form"}
                    >
                        <Input
                            label={"Password"}
                            disabled={newPasswordForm.formState.isSubmitting}
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            error={newPasswordForm.formState.errors.password?.message}
                            {...newPasswordForm.register("password")}
                            togglePasswordVisibility={togglePasswordShown}
                            passwordShown={passwordShown}
                        />
                        <Input
                            label={"Confirm Password"}
                            disabled={newPasswordForm.formState.isSubmitting}
                            type={confirmPasswordShown ? "text" : "password"}
                            placeholder="Password"
                            error={newPasswordForm.formState.errors.password?.message}
                            {...newPasswordForm.register('confirmPassword')}
                            togglePasswordVisibility={toggleConfirmPasswordShown}
                            passwordShown={confirmPasswordShown}
                        />
                        <Button
                            submit={true}
                            disabled={newPasswordForm.formState.isSubmitting}
                            type="submit"
                            style={
                                errorMessage || errors.length
                                    ? { border: "1px solid #BE2323" }
                                    : undefined
                            }
                            text={newPasswordLoading ? "Loading..." : "Reset Password"}
                        />
                        {successMessage && <span className={"success"}>{successMessage}</span>}
                        {errorMessage && <span className={"error"}>{errorMessage}</span>}
                        {errors.length > 0 && (
                            <div id="error-container">
                                <h2>Error:</h2>
                                <ul>
                                    {errors.map((error, index) => (
                                        <li key={index}>{error.msg}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </form>
                </FormProvider>
            </div>
        </main>
    </React.Fragment>;
}

export default NewPasswordForm;