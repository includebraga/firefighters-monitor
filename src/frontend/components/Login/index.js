import React from "react";
import useForm from "react-hook-form";
import classNames from "classnames";

import Button from "../Button";

import "./index.css";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const registerRequiredField = () => register({ required: true });
  const onSubmit = data => console.log(data.code);

  return (
    <div styleName="root">
      <div styleName="wrapper">
        <h1 styleName="heading">Bem vindo</h1>
        <form styleName="card" onSubmit={handleSubmit(onSubmit)}>
          <span styleName={classNames("errors", { show: !!errors.code })}>
            Ups! Preenche o teu número interno
          </span>
          <input
            styleName={classNames("input", "border", {
              invalid: errors.code || errors.password,
            })}
            name="code"
            type="string"
            placeholder="Número de bombeiro"
            ref={registerRequiredField()}
          />
          <span styleName={classNames("errors", { show: !!errors.password })}>
            Ups! Preenche a tua password
          </span>
          <input
            styleName="input"
            name="password"
            type="password"
            placeholder="Pasword"
            ref={registerRequiredField()}
          />
          <div styleName="buttonWrapper">
            <Button type="submit" label="Entrar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
