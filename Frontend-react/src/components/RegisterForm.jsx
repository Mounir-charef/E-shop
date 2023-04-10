const RegisterForm = ({ handleSubmit, formData, handleChange }) => {
  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form-content">
        <input
          value={formData.username}
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="Username"
          id="username"
          required
          className="form-item"
        />
        <input
          value={formData.email}
          type="text"
          onChange={handleChange}
          autoComplete="email"
          name="email"
          placeholder="Email"
          id="email"
          required
          className="form-item"
        />
        <input
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          name="password"
          placeholder="Password"
          id="password"
          required
          className="form-item"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="form-submit-btn"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
