import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../utils/validation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { LoginDto } from "../../types";
import { login } from "../../services";
import qencodeLogo from "../../assets/icons/qencode.svg";
import googleLogo from '../../assets/icons/google.svg';
import githubLogo from '../../assets/icons/github.svg';
import "./styles/index.scss";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const togglePasswordShown = () => {
        setPasswordShown((prev) => !prev);
    };

    const loginForm = useForm<LoginDto>({
        mode: "onChange",
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
    };

    return (
        <React.Fragment>
            <main className={"container login"}>
                <div className={"login"}>
                    <div className={"logo"}>
                        <img src={qencodeLogo} alt="Qencode Logo" />
                    </div>
                    <h1 className={"title"}>Log in to your account</h1>
                    <div
                        className={"buttons"}
                    >
                        <Link
                            className={"button google"}
                            type="button"
                            title="Log in by google"
                            to={'https://portal.qencode.com/signup'}
                        >
                            <img src={googleLogo} alt="Google logo" />
                            <span>Google</span>
                        </Link>
                        <Link
                            className={"button github"}
                            type="button"
                            title="Log in by github"
                            to={'https://portal.qencode.com/signup'}
                        >
                            <img src={githubLogo} alt="Github logo" />
                            <span>Github</span>
                        </Link>
                    </div>
                    <div className={'divider'}>
                        <div className={'line'}></div>
                        <span>OR</span>
                        <div className={'line'}></div>
                    </div>
                    <FormProvider {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onSubmit)} className={'form'}>
                            <div className={"field"}>
                                <div className={"input"}>
                                    <input
                                        placeholder="Work email"
                                        type="text"
                                        style={
                                            loginForm.formState.errors.email && {
                                                border: "1px solid #BE2323",
                                            }
                                        }
                                        required
                                        {...loginForm.register("email")}
                                    />
                                </div>
                                <span className={"error"}>
                                    {loginForm.formState.errors.email &&
                                        loginForm.formState.errors.email.message}
                                </span>
                            </div>
                            <div className={"field"}>
                                <div className={"input"}>
                                    <input
                                        placeholder="Password"
                                        style={
                                            loginForm.formState.errors.password && {
                                                border: "1px solid #BE2323",
                                            }
                                        }
                                        type={passwordShown ? "text" : "password"}
                                        {...loginForm.register("password")}
                                    />
                                </div>
                                <span className={"error"}>
                                    {loginForm.formState.errors.password &&
                                        loginForm.formState.errors.password.message}
                                </span>
                            </div>
                            <div className={"forgot"}>
                                <Link
                                    className={"link"}
                                    to="/forgot-password"
                                    rel="noopener"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <button
                                disabled={loginForm.formState.isSubmitting}
                                className={`submit`}
                                type="submit"
                            >
                                {loginLoading ? "Loading..." : "Log in to Qencode"}
                            </button>
                        </form>
                        <div className={"details"}>
                            Is your company new to Qencode?{" "}
                            <Link
                                className={"link"}
                                to="https://portal.qencode.com/signup"
                                rel="noopener"
                                target="_blank"
                            >
                                Sign up
                            </Link>
                        </div>
                    </FormProvider>
                </div>
            </main>
        </React.Fragment>
    );
};

export default LoginForm;
