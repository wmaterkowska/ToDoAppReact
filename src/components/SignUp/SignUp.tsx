import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import DOMPurify from "dompurify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import type { SignUpUser } from "data/SignUpUser";
import { signupUser } from "services/userService";

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
    <>
      <h2>Register:</h2>
      <form onSubmit={handleSubmit(registerUser)}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" placeholder="username" id="username" required {...register("username", { required: true })} />
          {errors.username && <p role="alert">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="e-mail">e-mail</label>
          <input type="email" placeholder="e-mail" id="e-mail" required {...register("email", { required: true })} />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" placeholder="password" id="password" required {...register("password", { required: true })} />
          {errors.password && <p role="alert">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
            required
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (<p role="alert">{errors.confirmPassword.message}</p>)}
        </div>
        <button type="submit">Signup</button>
      </form>
    </>
  )
}
export default SignUp;