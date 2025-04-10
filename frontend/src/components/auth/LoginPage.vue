<template>
    <div class="auth-page">
        <div class="auth-image">
            <img src="@/assets/global.png" />
        </div>
        <div class="auth-container">
            <section>
                <form @submit.prevent="handleLogin">
                    <h1>Login</h1>
                    <div class="loginForm">
                        <div class="inputBox">
                            <i class="fa-solid fa-user"></i>
                            <input v-model="credentials.username" type="text" required />
                            <label>Username</label>
                        </div>
                        <div class="inputBox">
                            <i class="fa-solid fa-lock"></i>
                            <input v-model="credentials.password" type="password" required />
                            <label>Password</label>
                        </div>
                        <button type="submit">Login</button>
                        <p>
                            don't have an account?
                            <router-link to="/signup" class="link">Sign Up</router-link>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser, useAuth } from "@/services/authService";
import Swal from 'sweetalert2';

const router = useRouter();
const {login} = useAuth();

const credentials = ref({
    username: "",
    password: "",
});

const handleLogin = async () => {
    try {
        const result = await loginUser(credentials.value)
        login(result.token); 
        await Swal.fire({
            icon: "success",
            title: "Logged in successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        router.push("/"); 
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Login failed",
            text: "Invalid username or password",
        });
    }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  height: 100vh;
  background: #1a1a2e;
}

.auth-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.auth-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.auth-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 26, 46, 0.5);
}

.auth-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #1a1a2e;
}

section {
  width: 100%;
  max-width: 500px;
  padding: 3rem;
  background: rgba(26, 26, 46, 0.7);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}

h1 {
  color: #f8f9fa;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.inputBox {
  position: relative;
  margin: 2.5rem 0 1rem;
}

.inputBox input {
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #f8f9fa;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.inputBox i {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #adb5bd;
  z-index: 1;
}

.inputBox label {
  position: absolute;
  left: 3rem;
  top: 1rem;
  color: #fff;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1;
}

.inputBox input:focus ~ label,
.inputBox input:valid ~ label {
  transform: translateY(-1.5rem);
  font-size: 0.8rem;
  color: #4cc9f0;
  background: #1a1a2e;
  padding: 0 0.5rem;
  left: 2.5rem;
  z-index: 1;
}

.inputBox input:focus {
  border-color: #4cc9f0;
  box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.2);
}

button {
  width: 100%;
  padding: 1rem;
  background: #4cc9f0;
  color: #1a1a2e;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

button:hover {
  background: #3aa8d8;
  transform: translateY(-2px);
}

p {
  color: #adb5bd;
  text-align: center;
  margin-top: 1.5rem;
}

.link {
  color: #4cc9f0;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-page {
    flex-direction: column;
  }
  
  .auth-image {
    display: none;
  }
  
  section {
    padding: 2rem;
  }
}
</style>
