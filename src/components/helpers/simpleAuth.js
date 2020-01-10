
const isAuthenticated = () => {
  return localStorage.getItem("kennywood_token") !== null
}

const register = (userInfo) => {
  return fetch("http://127.0.0.1:8000/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => res.json())
  .then(res => {
      if ("token" in res) {
        localStorage.setItem( "kennywood_token", res.token )
      }
  })
}

const login = (credentials) => {
  return fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(credentials)
  })
  .then(res => res.json())
  .then(res => {
      if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem( "kennywood_token", res.token )
      }
  })
}

// Note! This is not an async method. Don't make the mistake of doing logout().then()
const logout = () => {
  localStorage.removeItem("kennywood_token")
}

export {isAuthenticated, login, register, logout}
