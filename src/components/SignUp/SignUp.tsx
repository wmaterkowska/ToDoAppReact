import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import DOMPurify from "dompurify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import type { SignUpUser } from "data/SignUpUser";
import { signupUser } from "services/userService";
import "./SignUp.css"

const formSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password length should be at least 5 characters")
    .max(50, "Password cannot exceed 50 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  email: Yup.string()
    .required("Please enter a valid email address")
    .email("Please enter a valid email address"),
  username: Yup.string()
    .required("Please enter your name")
    .min(3, "Name should be at least 3 characters")
    .max(40, "Name cannot exceed 40 characters"),
});


const SignUp: React.FC<{}> = () => {

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


  const registerUser: SubmitHandler<FieldValues> = async (data) => {

    const newUserData: SignUpUser = {
      username: clean(data.username),
      email: clean(data.email),
      password: clean(data.password)
    };
    const response = await signupUser(newUserData);
    reset();

    window.location.href = '/login';
  }


  return (
    <div className="form-container">
      <h2>Register:</h2>
      <form onSubmit={handleSubmit(registerUser)} className="form">
        <div className="input-div">
          <label htmlFor="username" className="label">username</label>
          <input type="text" placeholder="username" id="username" {...register("username", { required: true })} className="input" />
        </div>
        {errors.username && <p className="alert" role="alert">{errors.username.message}</p>}
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
        <div className="input-div">
          <label htmlFor="confirmPassword" className="label">confirm password</label>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            {...register("confirmPassword", { required: true })}
            className="input"
          />
        </div>
        {errors.confirmPassword && (<p className="alert" role="alert">{errors.confirmPassword.message}</p>)}
        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  )
}
export default SignUp;