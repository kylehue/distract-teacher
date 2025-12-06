<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Username Input -->
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            placeholder="Enter your username"
            :class="{ error: errors.username }"
          />
          <span v-if="errors.username" class="error-message">{{
            errors.username
          }}</span>
        </div>

        <!-- Password Input -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            :class="{ error: errors.password }"
          />
          <span v-if="errors.password" class="error-message">{{
            errors.password
          }}</span>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="form.rememberMe" />
            Remember me
          </label>
          <button
            type="button"
            @click="handleForgotPassword"
            class="forgot-password-link"
            :disabled="isSubmitting"
          >
            Forgot password?
          </button>
        </div>

        <!-- Login Button -->
        <button type="submit" class="login-btn" :disabled="isSubmitting">
          <span v-if="isSubmitting">Logging in...</span>
          <span v-else>Login</span>
        </button>

        <div v-if="loginError" class="error-message server-error">
          {{ loginError }}
        </div>
      </form>

      <!-- Register Link -->
      <div class="register-link">
        Don't have an account?
        <RouterLink to="/register" class="link-btn">Sign-up</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Form state
const form = reactive({
  username: "",
  password: "",
  rememberMe: false,
});

// Error state
const errors = reactive({
  username: "",
  password: "",
});

const isSubmitting = ref(false);
const loginError = ref("");

// Form validation
const validateForm = () => {
  // Clear previous errors
  errors.username = "";
  errors.password = "";

  let isValid = true;

  if (!form.username.trim()) {
    errors.username = "Username is required";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  return isValid;
};

// Login handler
const handleLogin = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  loginError.value = "";

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check against localStorage users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.username === form.username && u.password === form.password
    );

    if (user) {
      // Store user session
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
        })
      );

      // Store remember me preference
      if (form.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("savedUsername", form.username);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("savedUsername");
      }

      // Navigate to dashboard
      router.push("/dashboard/overview");
    } else {
      loginError.value = "Invalid credentials. Please try again.";
    }
  } catch (error) {
    console.error("Login error:", error);
    loginError.value = "Login failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

// Navigation handlers
const handleForgotPassword = () => {
  router.push("/forgot-password");
};

// Initialize demo users on mount
const initializeDemoUsers = () => {
  if (!localStorage.getItem("users")) {
    const demoUsers = [
      {
        id: 1,
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("users", JSON.stringify(demoUsers));
  }

  // Load saved credentials if remember me was checked
  if (localStorage.getItem("rememberMe") === "true") {
    form.username = localStorage.getItem("savedUsername") || "";
    form.rememberMe = true;
  }
};

// Initialize on component mount
initializeDemoUsers();
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

/* FIX: Ensure text is visible in inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  color: #333; /* ADDED: Ensure text color is visible */
  background-color: white; /* ADDED: Ensure background is white */
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #667eea;
}

input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.server-error {
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  background-color: #fee;
  border-radius: 6px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  color: #666;
}

.remember-me input {
  margin: 0;
  width: 16px;
  height: 16px;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  text-decoration: none;
}

.forgot-password-link:hover:not(:disabled) {
  text-decoration: underline;
}

.forgot-password-link:disabled {
  color: #999;
  cursor: not-allowed;
}

/* Login Button */
.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-bottom: 10px;
}

.login-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Register Link */
.register-link {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
  text-decoration: none;
}

.link-btn:hover {
  text-decoration: underline;
}
</style>
