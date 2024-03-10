import React, { FC, useState } from "react";
import './index.scss';
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "../../utils/validation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponse, ForgotPasswordDto } from "../../types";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services";
import Logo from "../UI/logo";
import Input from "../UI/Input";
import Button from "../UI/button";
import MessageComponent from "../UI/message";
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

const ForgotPasswordForm: FC = () => {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    const forgotPasswordForm = useForm<ForgotPasswordDto>({
        mode: "onChange",
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const onSubmit: SubmitHandler<ForgotPasswordDto> = async (dto: ForgotPasswordDto) => {
        try {
            setErrors([]);
            const { error } = await Api().auth.resetPassword({ email: dto.email, redirect_url: REDIRECT_URL })
            if (!error) {
                setSuccessMessage('Password reset link was sent to your email!')
            }
        } catch (err) {
            const details = (err as ErrorResponse)?.detail;
            const unifiedErrors = typeof details === 'string' ? [details] : details.map(err => err.msg);
            setErrors(unifiedErrors);
        }
    }

    return <React.Fragment>
        <main className={"container forgotPassword"} id='forgot-password'>
            <div className={"forgotPassword"}>
                <Logo />
                <h1 className={"title"}>Forgot Password?</h1>
                <FormProvider {...forgotPasswordForm}>
                    <form
                        onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
                        className={"form"}
                    >
                        <Input
                            disabled={forgotPasswordForm.formState.isSubmitting}
                            type="text"
                            placeholder="Work email"
                            error={forgotPasswordForm.formState.errors.email?.message}
                            {...forgotPasswordForm.register("email")}
                        />
                        <Button
                            submit={true}
                            disabled={forgotPasswordForm.formState.isSubmitting}
                            className={`submit`}
                            type="submit"
                            style={
                                errors.length
                                    ? { border: "1px solid #BE2323" }
                                    : undefined
                            }
                            text={forgotPasswordForm.formState.isSubmitting ? "Loading..." : "Send"}
                        />
                        <Button
                            submit={false}
                            disabled={forgotPasswordForm.formState.isSubmitting}
                            type="button"
                            text={"Cancel"}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}
                        />
                        <MessageComponent errors={errors} successMessage={successMessage} />
                    </form>
                </FormProvider>
            </div>
        </main >
    </React.Fragment >;
}

export default ForgotPasswordForm;