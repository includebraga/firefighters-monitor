import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useForm from "react-hook-form";
import classNames from "classnames";

import Button from "../Button";

import "./index.css";

const AvailabilityForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [selectedDate, setDate] = useState(new Date());
  const registerRequiredField = () => register({ required: true });
  const onSubmit = data => console.log(data.code);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form styleName="card" onSubmit={handleSubmit(onSubmit)}>
        <TimePicker value={selectedDate} onChange={setDate} />
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
    </MuiPickersUtilsProvider>
  );
};

export default AvailabilityForm;
