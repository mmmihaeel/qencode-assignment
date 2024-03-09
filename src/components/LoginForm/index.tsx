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

const LoginForm: FC = () => {
    const navigate = useNavigate();
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errors, setErrors] = useState<
        {
            loc: string[];
            msg: string;
            type: string;
        }[]
    >([]);
    const togglePasswordShown = () => {
        setPasswordShown((prev) => !prev);
    };

    const loginForm = useForm<LoginDto>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginDto> = async (dto: LoginDto) => {
        try {
            setLoginLoading(true);
            setErrors([]);
            setErrorMessage("");
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
            setLoginLoading(false);
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
            setLoginLoading(false);
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
                                    errorMessage || errors.length
                                        ? { border: "1px solid #BE2323" }
                                        : undefined
                                }
                                text={loginLoading ? "Loading..." : "Log in to Qencode"}
                            />
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
