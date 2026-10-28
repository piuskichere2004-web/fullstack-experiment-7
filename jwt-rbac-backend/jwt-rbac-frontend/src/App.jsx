import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [notification, setNotification] = useState("");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      showNotification("Please enter username and password.");
      return;
    }

    // Temporary frontend demo authentication
    const role =
      loginData.username.toLowerCase() === "admin"
        ? "ADMIN"
        : "USER";

    setUser({
      username: loginData.username,
      email: `${loginData.username}@example.com`,
      role,
    });

    setPage("dashboard");
    showNotification(`Welcome back, ${loginData.username}!`);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      showNotification("Please fill in all fields.");
      return;
    }

    setUser({
      username: registerData.username,
      email: registerData.email,
      role: registerData.role,
    });

    setPage("dashboard");
    showNotification("Account created successfully!");
  };

  const logout = () => {
    setUser(null);
    setPage("login");
    setLoginData({
      username: "",
      password: "",
    });

    showNotification("You have been logged out.");
  };

  if (!user && page === "login") {
    return (
      <>
        <LoginPage
          data={loginData}
          setData={setLoginData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onSubmit={handleLogin}
          goRegister={() => setPage("register")}
        />

        {notification && (
          <div className="toast error-toast">
            <span>!</span>
            {notification}
          </div>
        )}
      </>
    );
  }

  if (!user && page === "register") {
    return (
      <>
        <RegisterPage
          data={registerData}
          setData={setRegisterData}
          showPassword={showRegisterPassword}
          setShowPassword={setShowRegisterPassword}
          onSubmit={handleRegister}
          goLogin={() => setPage("login")}
        />

        {notification && (
          <div className="toast">
            <span>✓</span>
            {notification}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Dashboard
        user={user}
        page={page}
        setPage={setPage}
        logout={logout}
      />

      {notification && (
        <div className="toast">
          <span>✓</span>
          {notification}
        </div>
      )}
    </>
  );
}


/* =========================
   LOGIN PAGE
========================= */

function LoginPage({
  data,
  setData,
  showPassword,
  setShowPassword,
  onSubmit,
  goRegister,
}) {
  return (
    <div className="auth-container">

      <div className="auth-background">
        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>
        <div className="orb orb-three"></div>
      </div>

      <div className="auth-left">

        <div className="brand-large">
          <div className="brand-icon">S</div>

          <div>
            <h2>SecureX</h2>
            <span>Identity & Access</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="security-badge">
            <span className="pulse-dot"></span>
            SYSTEM SECURE
          </div>

          <h1>
            Secure access.
            <br />
            <span>Simple control.</span>
          </h1>

          <p>
            A modern authentication platform powered by
            JWT security and role-based access control.
          </p>

          <div className="security-features">

            <div className="security-feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>JWT Authentication</strong>
                <small>Secure token-based access</small>
              </div>
            </div>

            <div className="security-feature">
              <div className="feature-icon">◆</div>
              <div>
                <strong>Role-Based Access</strong>
                <small>USER and ADMIN permissions</small>
              </div>
            </div>

            <div className="security-feature">
              <div className="feature-icon">⌁</div>
              <div>
                <strong>Protected APIs</strong>
                <small>Every request stays protected</small>
              </div>
            </div>

          </div>
        </div>

        <div className="auth-footer">
          <span>●</span> All systems operational
        </div>

      </div>


      <div className="auth-right">

        <div className="mobile-brand">
          <div className="brand-icon">S</div>
          <strong>SecureX</strong>
        </div>

        <div className="login-card">

          <div className="form-header">
            <div className="form-lock">🔐</div>

            <h2>Welcome back</h2>

            <p>
              Sign in to access your secure workspace.
            </p>
          </div>


          <form onSubmit={onSubmit}>

            <div className="input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <span className="input-icon">◎</span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={data.username}
                  onChange={(e) =>
                    setData({
                      ...data,
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>


            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">◆</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>


            <div className="form-options">

              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-button"
              >
                Forgot password?
              </button>

            </div>


            <button className="primary-button" type="submit">
              <span>Sign in</span>
              <span>→</span>
            </button>

          </form>


          <div className="divider">
            <span>OR</span>
          </div>


          <div className="demo-info">
            <div className="demo-icon">i</div>

            <div>
              <strong>Demo mode</strong>
              <p>
                Use <b>admin</b> for ADMIN access.
                Any other username becomes USER.
              </p>
            </div>
          </div>


          <div className="register-link">
            Don't have an account?
            <button onClick={goRegister}>
              Create account
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================
   REGISTER PAGE
========================= */

function RegisterPage({
  data,
  setData,
  showPassword,
  setShowPassword,
  onSubmit,
  goLogin,
}) {
  return (
    <div className="register-screen">

      <div className="register-glow glow-one"></div>
      <div className="register-glow glow-two"></div>

      <div className="register-card">

        <div className="register-brand">
          <div className="brand-icon">S</div>
          <div>
            <strong>SecureX</strong>
            <span>Identity & Access</span>
          </div>
        </div>

        <div className="register-header">
          <div className="form-lock">✨</div>
          <h1>Create your account</h1>
          <p>
            Join the secure access platform.
          </p>
        </div>


        <form onSubmit={onSubmit}>

          <div className="two-inputs">

            <div className="input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <span className="input-icon">◎</span>

                <input
                  type="text"
                  placeholder="Choose username"
                  value={data.username}
                  onChange={(e) =>
                    setData({
                      ...data,
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>


            <div className="input-group">
              <label>Email</label>

              <div className="input-wrapper">
                <span className="input-icon">@</span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

          </div>


          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="input-icon">◆</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>


          <div className="input-group">
            <label>Account type</label>

            <div className="role-selector">

              <button
                type="button"
                className={
                  data.role === "USER"
                    ? "role-option active"
                    : "role-option"
                }
                onClick={() =>
                  setData({
                    ...data,
                    role: "USER",
                  })
                }
              >
                <span>👤</span>
                <div>
                  <strong>User</strong>
                  <small>Standard access</small>
                </div>
              </button>


              <button
                type="button"
                className={
                  data.role === "ADMIN"
                    ? "role-option active admin-role"
                    : "role-option"
                }
                onClick={() =>
                  setData({
                    ...data,
                    role: "ADMIN",
                  })
                }
              >
                <span>🛡</span>
                <div>
                  <strong>Admin</strong>
                  <small>Management access</small>
                </div>
              </button>

            </div>
          </div>


          <button className="primary-button register-button">
            <span>Create account</span>
            <span>→</span>
          </button>

        </form>


        <div className="register-link">
          Already have an account?
          <button onClick={goLogin}>
            Sign in
          </button>
        </div>

      </div>

    </div>
  );
}


/* =========================
   DASHBOARD
========================= */

function Dashboard({
  user,
  page,
  setPage,
  logout,
}) {

  const isAdmin = user.role === "ADMIN";

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="brand-icon">
            S
          </div>

          <div>
            <strong>SecureX</strong>
            <span>Security Portal</span>
          </div>

        </div>


        <div className="sidebar-section">
          <span className="sidebar-label">
            MAIN MENU
          </span>

          <button
            className={page === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => setPage("dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className={page === "profile" ? "nav-item active" : "nav-item"}
            onClick={() => setPage("profile")}
          >
            <span>◎</span>
            My Profile
          </button>

          {isAdmin && (
            <>
              <span className="sidebar-label admin-label">
                ADMINISTRATION
              </span>

              <button
                className={page === "admin" ? "nav-item active admin-nav" : "nav-item"}
                onClick={() => setPage("admin")}
              >
                <span>♜</span>
                Admin Panel
                <b>ADMIN</b>
              </button>

              <button className="nav-item">
                <span>♧</span>
                User Management
              </button>

              <button className="nav-item">
                <span>⚙</span>
                Security Settings
              </button>
            </>
          )}
        </div>


        <div className="sidebar-bottom">

          <div className="security-status">
            <div className="status-icon">
              ✓
            </div>

            <div>
              <strong>System Secure</strong>
              <span>JWT protection active</span>
            </div>
          </div>


          <button className="logout-button" onClick={logout}>
            <span>↪</span>
            Sign out
          </button>

        </div>

      </aside>


      <main className="main-content">

        <header className="topbar">

          <div>
            <span className="breadcrumb">
              SecureX / {page}
            </span>

            <h2>
              {page === "dashboard" && "Dashboard"}
              {page === "profile" && "My Profile"}
              {page === "admin" && "Admin Panel"}
            </h2>
          </div>


          <div className="topbar-user">

            <div className="notification">
              ♢
              <span></span>
            </div>

            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div className="topbar-user-info">
              <strong>{user.username}</strong>
              <span>{user.role}</span>
            </div>

          </div>

        </header>


        <div className="page-content">

          {page === "dashboard" && (
            <DashboardHome user={user} isAdmin={isAdmin} />
          )}

          {page === "profile" && (
            <ProfilePage user={user} />
          )}

          {page === "admin" && isAdmin && (
            <AdminPage />
          )}

        </div>

      </main>

    </div>
  );
}


/* =========================
   DASHBOARD HOME
========================= */

function DashboardHome({ user, isAdmin }) {

  return (
    <>

      <div className="welcome-section">

        <div>
          <div className="welcome-tag">
            <span>✦</span>
            AUTHENTICATION SUCCESSFUL
          </div>

          <h1>
            Welcome back,{" "}
            <span>{user.username}</span>
          </h1>

          <p>
            Your account is protected and your access
            permissions are active.
          </p>
        </div>

        <div className="role-badge">
          <span>●</span>
          {user.role}
        </div>

      </div>


      <div className="stats-grid">

        <StatCard
          icon="✓"
          title="Authentication"
          value="ACTIVE"
          description="JWT session verified"
        />

        <StatCard
          icon="◆"
          title="Access Level"
          value={user.role}
          description="Role-based permissions"
        />

        <StatCard
          icon="◉"
          title="API Status"
          value="ONLINE"
          description="All services operational"
        />

        <StatCard
          icon="⌁"
          title="Security"
          value="PROTECTED"
          description="Protected endpoints"
        />

      </div>


      <div className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                ACCESS CONTROL
              </span>
              <h3>Your permissions</h3>
            </div>

            <span className="panel-icon">♢</span>
          </div>


          <div className="permission-list">

            <Permission
              name="Dashboard Access"
              allowed={true}
            />

            <Permission
              name="Profile Access"
              allowed={true}
            />

            <Permission
              name="Protected API"
              allowed={true}
            />

            <Permission
              name="Admin Management"
              allowed={isAdmin}
            />

          </div>

        </div>


        <div className="panel security-panel">

          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                SECURITY
              </span>

              <h3>Authentication status</h3>
            </div>
          </div>


          <div className="security-circle">
            <div>
              <strong>100%</strong>
              <span>SECURE</span>
            </div>
          </div>


          <p>
            Your current session is protected by
            token-based authentication.
          </p>

        </div>

      </div>


      {isAdmin && (
        <div className="admin-banner">

          <div className="admin-banner-icon">
            ♜
          </div>

          <div>
            <strong>Administrator privileges enabled</strong>
            <p>
              You have access to restricted management
              features and administrative endpoints.
            </p>
          </div>

        </div>
      )}

    </>
  );
}


/* =========================
   PROFILE
========================= */

function ProfilePage({ user }) {

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-cover"></div>

        <div className="profile-body">

          <div className="large-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="profile-title">
            <h1>{user.username}</h1>

            <span className="profile-role">
              {user.role}
            </span>
          </div>

          <p className="profile-email">
            {user.email}
          </p>


          <div className="profile-info-grid">

            <InfoItem
              title="Username"
              value={user.username}
            />

            <InfoItem
              title="Email"
              value={user.email}
            />

            <InfoItem
              title="Role"
              value={user.role}
            />

            <InfoItem
              title="Authentication"
              value="JWT"
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================
   ADMIN
========================= */

function AdminPage() {

  const users = [
    {
      username: "pius",
      email: "pius@example.com",
      role: "USER",
      status: "Active",
    },
    {
      username: "admin",
      email: "admin@example.com",
      role: "ADMIN",
      status: "Active",
    },
    {
      username: "john",
      email: "john@example.com",
      role: "USER",
      status: "Active",
    },
    {
      username: "sarah",
      email: "sarah@example.com",
      role: "USER",
      status: "Inactive",
    },
  ];

  return (
    <>

      <div className="admin-heading">

        <div>
          <div className="welcome-tag">
            <span>♜</span>
            ADMINISTRATOR AREA
          </div>

          <h1>
            User management
          </h1>

          <p>
            Manage users and role-based access permissions.
          </p>
        </div>

        <button className="primary-button small-button">
          + Add user
        </button>

      </div>


      <div className="admin-stats">

        <StatCard
          icon="♙"
          title="Total Users"
          value="24"
          description="Registered accounts"
        />

        <StatCard
          icon="✓"
          title="Active"
          value="21"
          description="Currently active"
        />

        <StatCard
          icon="♜"
          title="Administrators"
          value="3"
          description="Admin accounts"
        />

      </div>


      <div className="users-panel">

        <div className="panel-header">

          <div>
            <span className="panel-kicker">
              USERS
            </span>

            <h3>Registered accounts</h3>
          </div>

          <button className="filter-button">
            Filter ▾
          </button>

        </div>


        <div className="user-table">

          <div className="table-header">
            <span>USER</span>
            <span>ROLE</span>
            <span>STATUS</span>
            <span>ACTION</span>
          </div>

          {users.map((item) => (

            <div className="table-row" key={item.username}>

              <div className="table-user">

                <div className="mini-avatar">
                  {item.username.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{item.username}</strong>
                  <small>{item.email}</small>
                </div>

              </div>


              <span className={
                item.role === "ADMIN"
                  ? "table-role admin"
                  : "table-role"
              }>
                {item.role}
              </span>


              <span className={
                item.status === "Active"
                  ? "status-active"
                  : "status-inactive"
              }>
                ● {item.status}
              </span>


              <button className="more-button">
                •••
              </button>

            </div>

          ))}

        </div>

      </div>

    </>
  );
}


/* =========================
   SMALL COMPONENTS
========================= */

function StatCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="stat-status">
          ●
        </span>

      </div>

      <span className="stat-title">
        {title}
      </span>

      <strong className="stat-value">
        {value}
      </strong>

      <span className="stat-description">
        {description}
      </span>

    </div>
  );
}


function Permission({ name, allowed }) {

  return (
    <div className="permission">

      <div className={allowed ? "permission-check" : "permission-denied"}>
        {allowed ? "✓" : "×"}
      </div>

      <span>{name}</span>

      <small>
        {allowed ? "Allowed" : "Restricted"}
      </small>

    </div>
  );
}


function InfoItem({ title, value }) {

  return (
    <div className="info-item">

      <span>{title}</span>

      <strong>{value}</strong>

    </div>
  );
}


export default App;