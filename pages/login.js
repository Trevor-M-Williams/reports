import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      let errorMessage = error.code.split("/")[1].replaceAll("-", " ");
      setError(errorMessage);
    }
    setLoading(false);
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-medium">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-sm flex-col"
      >
        {error && (
          <div className="my-2 rounded bg-red-300 p-2 capitalize">{error}</div>
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="my-2 rounded border border-gray-200 p-2 focus:outline-blue-600"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="my-2 rounded border border-gray-200 p-2 focus:outline-blue-600"
        />
        <input
          type="submit"
          value="Submit"
          disabled={loading}
          className="mt-2 mb-4 cursor-pointer rounded bg-blue-400 p-2 text-xl font-medium text-white
                   hover:bg-blue-500 focus:outline-blue-600"
        />
      </form>
    </div>
  );
}

export default Login;
