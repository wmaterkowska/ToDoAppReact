import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import DOMPurify from "dompurify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import type { LoginUser } from "data/LoginUser";
import { login } from "services/userService";
import "./Login.css"

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password length should be at least 5 characters")
    .max(50, "Password cannot exceed 50 characters"),
  email: Yup.string()
    .required("Please enter a valid email address")
    .email("Please enter a valid email address"),
});


const Login: React.FC<{}> = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  const clean = DOMPurify.sanitize;


  const loginUser: SubmitHandler<FieldValues> = async (data) => {

    const newUserData: LoginUser = {
      email: clean(data.email),
      password: clean(data.password)
    };
    const response = await login(newUserData);
    reset();

    if (response) {
      window.location.href = '/todos';
    }
  }


  return (
    <div className="form-container">
      <h2>Login:</h2>
      <form onSubmit={handleSubmit(loginUser)} className="form">
        <div className="input-div">
          <label htmlFor="e-mail" className="label">e-mail</label>
          <input type="email" placeholder="e-mail" id="e-mail" {...register("email", { required: true })} className="input" />
        </div>
        {errors.email && <p className="alert" role="alert">{errors.email.message}</p>}
        <div className="input-div">
          <label htmlFor="password" className="label">password</label>
          <input type="password" placeholder="password" id="password" {...register("password", { required: true })} className="input" />
        </div>
        {errors.password && <p className="alert" role="alert">{errors.password.message}</p>}
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  )
}
export default Login;