import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../utils/validation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LoginDto } from "../../types";
import { login } from "../../services";

const LoginForm: FC = () => {
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const togglePasswordShown = () => {
        setPasswordShown((prev) => !prev);
    };

    const loginForm = useForm<LoginDto>({
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginDto> = async (dto: LoginDto) => {
        console.log(dto);
        try {
            setLoginLoading(true);
            const response = await login(dto);
            console.log(response);
            setLoginLoading(false);
        } catch (err) {
            setLoginLoading(false);
        }
    }

    return <React.Fragment>
        <main>
            <FormProvider {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                    <div className={'LoginStyles.login__form_container'}>
                        <div className={'LoginStyles.login__form_field'}>
                            <div className={'LoginStyles.login__form_field_input'}>
                                <input type="text" style={loginForm.formState.errors.email && { border: "1px solid #BE2323" }} required {...loginForm.register('email')} />
                                <label htmlFor="email">{'enter_email'}</label>
                            </div>
                            <span className={'LoginStyles.login__form_field_error'}>
                                {loginForm.formState.errors.email &&
                                    loginForm.formState.errors.email.message}
                            </span>
                        </div>
                        <div className={'LoginStyles.login__form_field'}>
                            <div className={'LoginStyles.login__form_field_input'}>
                                <input style={loginForm.formState.errors.password && { border: "1px solid #BE2323" }} type={passwordShown ? 'text' : 'password'} required {...loginForm.register('password')} />
                                <label htmlFor="password">'enter_password'</label>
                                <div
                                    onClick={togglePasswordShown}
                                    className={'LoginStyles.login__form_field_input_hiddenIcon'}
                                >
                                    {/* <CustomImage
                                        placeholder="blur"
                                        blurDataURL="/static/img_placeholder.png"
                                        src={passwordShown ? showIcon : closeIcon}
                                        alt="show password icon"
                                        width={24}
                                        height={24}
                                    /> */}
                                </div>
                            </div>
                            <span className={'LoginStyles.login__form_field_error'}>
                                {loginForm.formState.errors.password &&
                                    loginForm.formState.errors.password.message}
                            </span>
                        </div>
                    </div>
                    <div className={'LoginStyles.login__form_details'}>
                    </div>
                    <button
                        disabled={loginForm.formState.isSubmitting}
                        className={`login__form__button offset`}
                        type="submit"
                    >
                        {loginLoading ? 'Loading...' : 'Log in to Qencode'}
                    </button>
                </form>
            </FormProvider>
        </main>
    </React.Fragment>;
}

export default LoginForm;