import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [credentialForm, setCredentialForm] = useState({
    service: "",
    username: "",
    password: "",
    notes: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setPage("dashboard");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setPage("dashboard");
  };

  const handleCredentialChange = (e) => {
    setCredentialForm({
      ...credentialForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveCredential = (e) => {
    e.preventDefault();

    alert("Credential saved successfully!");

    setCredentialForm({
      service: "",
      username: "",
      password: "",
      notes: ""
    });

    setPage("dashboard");
  };

  // LOGIN / REGISTER
  if (page === "login" || page === "register") {
    const isRegistering = page === "register";

    return (
      <div className="app">
        <div className="login-card">

          <div className="logo">
            🔐
          </div>

          <h1>
            {isRegistering ? "Create Account" : "Secure Storage"}
          </h1>

          <p className="subtitle">
            {isRegistering
              ? "Create your secure storage account"
              : "Securely manage your credentials"}
          </p>

          <form
            onSubmit={
              isRegistering
                ? handleRegister
                : handleLogin
            }
          >

            <div className="input-group">
              <label>Username</label>

              <input
                type="text"
                placeholder={
                  isRegistering
                    ? "Choose a username"
                    : "Enter your username"
                }
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-box">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder={
                    isRegistering
                      ? "Create a password"
                      : "Enter your password"
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {isRegistering && (
              <div className="input-group">
                <label>Confirm Password</label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button
              className="login-button"
              type="submit"
            >
              {isRegistering
                ? "Create Account"
                : "Login"}
            </button>

          </form>

          <p className="register-text">

            {isRegistering
              ? "Already have an account? "
              : "Don't have an account? "}

            <span
              onClick={() =>
                setPage(
                  isRegistering
                    ? "login"
                    : "register"
                )
              }
            >
              {isRegistering
                ? "Login"
                : "Register"}
            </span>

          </p>

        </div>
      </div>
    );
  }

  // ADD CREDENTIAL PAGE
  if (page === "add") {
    return (
      <div className="dashboard">

        <aside className="sidebar">

          <div className="brand">
            🔐
            <span>Secure Storage</span>
          </div>

          <nav>

            <button
              className="nav-item"
              onClick={() => setPage("dashboard")}
            >
              🏠 Dashboard
            </button>

            <button
              className="nav-item"
            >
              🔑 Credentials
            </button>

            <button
              className="nav-item active"
            >
              ➕ Add Credential
            </button>

          </nav>

          <button
            className="logout-button"
            onClick={() => setPage("login")}
          >
            🚪 Logout
          </button>

        </aside>

        <main className="main-content">

          <div className="form-header">

            <button
              className="back-button"
              onClick={() => setPage("dashboard")}
            >
              ← Back
            </button>

            <h1>Add Credential</h1>

            <p>
              Store your third-party credentials securely.
            </p>

          </div>

          <div className="credential-form-card">

            <div className="security-message">
              🔒 Your sensitive information will be
              encrypted before being stored.
            </div>

            <form onSubmit={handleSaveCredential}>

              <div className="form-row">

                <div className="input-group">
                  <label>Service Name</label>

                  <input
                    type="text"
                    name="service"
                    value={credentialForm.service}
                    onChange={handleCredentialChange}
                    placeholder="e.g. Google, GitHub, Facebook"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Username / Email</label>

                  <input
                    type="text"
                    name="username"
                    value={credentialForm.username}
                    onChange={handleCredentialChange}
                    placeholder="Enter username or email"
                    required
                  />
                </div>

              </div>

              <div className="input-group">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={credentialForm.password}
                  onChange={handleCredentialChange}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div className="input-group">
                <label>Notes</label>

                <textarea
                  name="notes"
                  value={credentialForm.notes}
                  onChange={handleCredentialChange}
                  placeholder="Optional notes"
                  rows="5"
                />
              </div>

              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setPage("dashboard")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  🔒 Save Credential
                </button>

              </div>

            </form>

          </div>

        </main>

      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="brand">
          🔐
          <span>Secure Storage</span>
        </div>

        <nav>

          <button
            className="nav-item active"
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </button>

          <button className="nav-item">
            🔑 Credentials
          </button>

          <button
            className="nav-item"
            onClick={() => setPage("add")}
          >
            ➕ Add Credential
          </button>

        </nav>

        <button
          className="logout-button"
          onClick={() => setPage("login")}
        >
          🚪 Logout
        </button>

      </aside>

      <main className="main-content">

        <div className="top-bar">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back! Here's your secure
              storage overview.
            </p>
          </div>

          <div className="profile">

            <div className="profile-icon">
              P
            </div>

            <div>
              <strong>Pius</strong>
              <small>Secure User</small>
            </div>

          </div>

        </div>

        <div className="stats">

          <div className="stat-card purple">

            <div className="stat-icon">
              🔑
            </div>

            <div>
              <h2>12</h2>
              <p>Saved Credentials</p>
            </div>

          </div>

          <div className="stat-card blue">

            <div className="stat-icon">
              🛡️
            </div>

            <div>
              <h2>100%</h2>
              <p>Encrypted</p>
            </div>

          </div>

          <div className="stat-card green">

            <div className="stat-icon">
              🔄
            </div>

            <div>
              <h2>Active</h2>
              <p>Session Status</p>
            </div>

          </div>

        </div>

        <div className="section-header">

          <div>
            <h2>Quick Actions</h2>

            <p>
              Manage your stored credentials
            </p>
          </div>

          <button
            className="add-button"
            onClick={() => setPage("add")}
          >
            + Add Credential
          </button>

        </div>

        <div className="credentials-card">

          <h2>Recent Credentials</h2>

          <div className="credential">

            <div className="service-icon">
              G
            </div>

            <div className="credential-info">
              <strong>Google</strong>
              <span>
                pius@example.com
              </span>
            </div>

            <span className="encrypted">
              🔒 Encrypted
            </span>

          </div>

          <div className="credential">

            <div className="service-icon">
              G
            </div>

            <div className="credential-info">
              <strong>GitHub</strong>
              <span>
                piuskichere
              </span>
            </div>

            <span className="encrypted">
              🔒 Encrypted
            </span>

          </div>

          <div className="credential">

            <div className="service-icon">
              F
            </div>

            <div className="credential-info">
              <strong>Facebook</strong>
              <span>
                pius@example.com
              </span>
            </div>

            <span className="encrypted">
              🔒 Encrypted
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;