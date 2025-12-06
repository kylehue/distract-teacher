<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Sign up</h2>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="form.fullName"
            placeholder="Enter your full name"
            :class="{ error: errors.fullName }"
          />
          <span v-if="errors.fullName" class="error-message">{{
            errors.fullName
          }}</span>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            placeholder="Choose a username"
            :class="{ error: errors.username }"
          />
          <span v-if="errors.username" class="error-message">{{
            errors.username
          }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Create a password"
            :class="{ error: errors.password }"
          />
          <span v-if="errors.password" class="error-message">{{
            errors.password
          }}</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            placeholder="Confirm your password"
            :class="{ error: errors.confirmPassword }"
          />
          <span v-if="errors.confirmPassword" class="error-message">{{
            errors.confirmPassword
          }}</span>
        </div>

        <div class="form-group terms">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.agreeToTerms" />
            I agree to the Terms & Conditions
          </label>
          <span v-if="errors.agreeToTerms" class="error-message">{{
            errors.agreeToTerms
          }}</span>
        </div>

        <button type="submit" class="register-btn" :disabled="isSubmitting">
          <span v-if="isSubmitting">Creating Account...</span>
          <span v-else>Register</span>
        </button>

        <div v-if="registerError" class="error-message server-error">
          {{ registerError }}
        </div>

        <div v-if="registerSuccess" class="success-message">
          {{ registerSuccess }}
        </div>
      </form>

      <div class="login-link">
        Already have an account?
        <RouterLink to="/login" class="link-btn">Login here</RouterLink>
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
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

// Error state
const errors = reactive({
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: "",
});

const isSubmitting = ref(false);
const registerError = ref("");
const registerSuccess = ref("");

// Form validation
const validateForm = () => {
  // Clear previous errors
  errors.fullName = "";
  errors.username = "";
  errors.password = "";
  errors.confirmPassword = "";
  errors.agreeToTerms = "";

  let isValid = true;

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required";
    isValid = false;
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
    isValid = false;
  }

  if (!form.username.trim()) {
    errors.username = "Username is required";
    isValid = false;
  } else if (form.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters";
    isValid = false;
  }

  if (!form.password) {
    errors.password = "Password is required";
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms and conditions";
    isValid = false;
  }

  return isValid;
};

// Registration handler
const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  registerError.value = "";
  registerSuccess.value = "";

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const usernameExists = users.some(
      (user: any) => user.username === form.username
    );

    if (usernameExists) {
      registerError.value =
        "Username already taken. Please choose a different username.";
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      fullName: form.fullName,
      username: form.username,
      password: form.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Show success message
    registerSuccess.value = "Registration successful! Redirecting to login...";

    // Clear the form
    form.fullName = "";
    form.username = "";
    form.password = "";
    form.confirmPassword = "";
    form.agreeToTerms = false;

    // Auto-login after registration
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
      })
    );

    // Redirect to dashboard after 1 second
    setTimeout(() => {
      router.push("/dashboard/overview");
    }, 1000);
  } catch (error) {
    console.error("Registration error:", error);
    registerError.value = "Registration failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
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

.register-form {
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

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  color: #333;
  background-color: white;
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

.success-message {
  text-align: center;
  margin-top: 15px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border-radius: 6px;
  border: 1px solid #c3e6cb;
}

.terms {
  margin-top: 25px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  color: #666;
}

.checkbox-label input {
  margin: 0;
  width: 16px;
  height: 16px;
}

.register-btn {
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
  margin-top: 10px;
}

.register-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-link {
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
