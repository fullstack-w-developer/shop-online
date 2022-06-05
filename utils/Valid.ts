interface props {
  email: string;
  name: string;
  password: string;
  cf_password: string;
}
export const validForm = ({
  name,
  email,
  password,
  cf_password,
}: props) => {
  if (!email) return "please inter your email address";
  if (!name) return "please inter your name ";
  if (!password) return "please inter your password ";
  if (!cf_password && password !== cf_password)
    return "please confirm your password";
};
