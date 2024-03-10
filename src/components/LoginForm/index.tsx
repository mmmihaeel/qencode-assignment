import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../utils/validation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponse, LoginDto } from "../../types";
import googleLogo from "../../assets/icons/google.svg";
import githubLogo from "../../assets/icons/github.svg";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import { Api } from "../../services";
import Cookies from "js-cookie";
import Logo from "../UI/logo";
import Button from "../UI/button";
import MessageComponent from "../UI/message";

const LoginForm: FC = () => {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const togglePasswordShown = () => {
        setPasswordShown((prev) => !prev);
    };

    const loginForm = useForm<LoginDto>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginDto> = async (dto: LoginDto) => {
        try {
            setErrors([]);
            const {
                refresh_token,
                access_token,
                refresh_token_expire,
                token_expire,

            } = await Api().auth.login(dto);
            Cookies.set("refreshToken", refresh_token, {
                path: "/",
                expires: refresh_token_expire,
            });
            Cookies.set("accessToken", access_token, {
                path: "/",
                expires: token_expire,
            });
            navigate("/");
        } catch (err) {
            const details = (err as ErrorResponse)?.detail;
            const unifiedErrors = typeof details === 'string' ? [details] : details.map(err => err.msg);
            setErrors(unifiedErrors);
        }
    };

    return (
        <React.Fragment>
            <main className={"container login"} id='login'>
                <div className={"login"}>
                    <Logo />
                    <h1 className={"title"}>Log in to your account</h1>
                    <div className={"buttons"}>
                        <Link
                            className={"button google"}
                            type="button"
                            title="Log in by google"
                            to={"https://portal.qencode.com/signup"}
                        >
                            <img src={googleLogo} alt="Google logo" />
                            <span>Google</span>
                        </Link>
                        <Link
                            className={"button github"}
                            type="button"
                            title="Log in by github"
                            to={"https://portal.qencode.com/signup"}
                        >
                            <img src={githubLogo} alt="Github logo" />
                            <span>Github</span>
                        </Link>
                    </div>
                    <div className={"divider"}>
                        <div className={"line"}></div>
                        <span>OR</span>
                        <div className={"line"}></div>
                    </div>
                    <FormProvider {...loginForm}>
                        <form
                            onSubmit={loginForm.handleSubmit(onSubmit)}
                            className={"form"}
                        >
                            <Input
                                disabled={loginForm.formState.isSubmitting}
                                type="text"
                                placeholder="Work email"
                                error={loginForm.formState.errors.email?.message}
                                {...loginForm.register("email")}
                            />
                            <Input
                                disabled={loginForm.formState.isSubmitting}
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                error={loginForm.formState.errors.password?.message}
                                {...loginForm.register("password")}
                                togglePasswordVisibility={togglePasswordShown}
                                passwordShown={passwordShown}
                            />
                            <div className={"forgot"}>
                                <Link className={"link"} to="/forgot-password" rel="noopener">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Button
                                submit={true}
                                disabled={loginForm.formState.isSubmitting}
                                className={`submit`}
                                type="submit"
                                style={
                                    errors.length
                                        ? { border: "1px solid #BE2323" }
                                        : undefined
                                }
                                text={loginForm.formState.isSubmitting ? "Loading..." : "Log in to Qencode"}
                            />
                            <MessageComponent errors={errors} />
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
