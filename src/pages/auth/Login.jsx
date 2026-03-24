import { useState } from "react";
import api from "../../services/api";

const Login = () => {
  const [form, setForm] = useState({email: "",password: ""});
  const [error, setError] = useState("");
  const handleChange = (e) => {setForm({...form,[e.target.name]: e.target.value});};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email: form.email, password: form.password }); 
      const data = res.data; 
      console.log(res)
      if (!res.status === 200) {
        setError(data.message);
        return;
      }
      // 🔥 GUARDAR USUARIO
      localStorage.setItem("token", data.token); // Si tu API devuelve un token, guárdalo también
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // 🔥 REDIRIGIR
      window.location.href = "/home";
      console.log("Usuario:", data.user);
      // 👉 luego aquí guardaremos sesión
    } catch (err) {console.log(err);}
  };
  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="card p-4 col-lg-4 mx-auto shadow"
      >
        <h4 className="mb-3 text-center">Login</h4>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        <p className="alert alert-info py-1">
            admin@test.com
            <br />
            123456
        </p>
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;