import React, { FC, useState } from "react";
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
import MessageComponent from "../UI/message";

const NewPasswordForm: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

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
            setErrors([]);
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
            const details = (err as ErrorResponse)?.detail;
            const unifiedErrors = typeof details === 'string' ? [details] : details.map(err => err.msg);
            setErrors(unifiedErrors);
        }
    }

    return <React.Fragment>
        <main className={"container newPassword"}>
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
                                errors.length
                                    ? { border: "1px solid #BE2323" }
                                    : undefined
                            }
                            text={newPasswordForm.formState.isSubmitting ? "Loading..." : "Reset Password"}
                        />
                        <MessageComponent errors={errors} successMessage={successMessage} />
                    </form>
                </FormProvider>
            </div>
        </main>
    </React.Fragment>;
}

export default NewPasswordForm;