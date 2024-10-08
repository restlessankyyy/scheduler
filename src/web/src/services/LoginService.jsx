import axios from "axios";

export const handleLogin = async (username, password, setUser, setError, navigate) => {
  try {
    const response = await axios.get("http://localhost:3001/users", {
      params: {
        username,
        password
      }
    });

    const user = response.data[0];
    if (user) {
      setUser(user);
      navigate(user.role === "admin" ? "/employer" : "/employee");
    } else {
      setError("Fel användarnamn eller lösenord");
    }
  } catch (err) {
    setError("Ett fel uppstod vid inloggning");
  }
};
