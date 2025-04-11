<template>
    <header class="main-header">
        <div class="logo">
            <router-link to="/">
                <img src="@/assets/logoMap.png" alt="Logo" />
            </router-link>
        </div>

        <nav class="nav-links">
            <router-link to="/">Home</router-link>
            <router-link to="/mapV1">Map</router-link>
            <router-link to="/mapV2">Map V2</router-link>
            <router-link to="/github">Github</router-link>
        </nav>

        <div class="auth-buttons">
            <router-link v-if="!isAuthenticated" to="/Login" class="btn btn-outline">Login</router-link>
            <router-link v-if="!isAuthenticated" to="/signup" class="btn btn-filled">Sign Up</router-link>
            <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">Logout</button>
        </div>
  </header>
    
</template>

<script>
import { useAuth } from '@/services/authService.js';
import { useRouter } from 'vue-router';



export default{
    name: 'HeaderNav',
    setup(){
        const { isAuthenticated, logout } = useAuth();
        const router = useRouter();

        const handleLogout = () => {
        logout();
        router.push('/login');
        };

        return {
                isAuthenticated,
                handleLogout ,   
                };
            }
}



</script>

<style>

.main-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    background: linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    margin-bottom: 1rem;
}

.logo img {
    width: 60px;
    transition: transform 0.3s ease;
}

.logo:hover img {
    transform: scale(1.05);
}

.nav-links {
    display: flex;
    gap: 1.5rem;
}

.nav-links a {
    text-decoration: none;
    color: #f8f9fa;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    position: relative;
}

.nav-links a:hover {
    color: #ffffff;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #4cc9f0;
    transition: all 0.3s ease;
}

.nav-links a:hover::after {
    width: 100%;
    left: 0;
}

.auth-buttons {
    display: flex;
    gap: 1rem;
}

.btn {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    font-weight: 500;
    display: inline-block;
    cursor: pointer;
}

.btn-outline {
    border: 1px solid #4cc9f0;
    color: #4cc9f0;
    background: transparent;
}

.btn-outline:hover {
    background-color: rgba(76, 201, 240, 0.1);
}

.btn-filled {
    background-color: #4cc9f0;
    color: #1a1a2e;
    border: none;
}

.btn-filled:hover {
    background-color: #3aa8d8;
    transform: translateY(-1px);
}

.logout-btn {
    color: #f8f9fa;
    background: transparent;
    border: 1px solid #f8f9fa;
    padding: 0.5rem 1.25rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    font-weight: 500;
}

.logout-btn:hover {
    background: rgba(248, 249, 250, 0.1);
    transform: translateY(-1px);
}

/* Active route styling */
.router-link-active {
    color: #4cc9f0 !important;
}

.router-link-active::after {
    width: 100% !important;
    left: 0 !important;
}



/* V1 of the style */
/* .nav{
    position: absolute; 
    top: 0; 
    left: 0;
    width: 100%; 
    height: 60px;
    background-color: #388e8b;
    overflow: hidden;
    padding: 10px 20px;
    z-index: 1000; 
}

.nav a{
    float: left;
    color: white;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}
.nav a:hover{
    background-color: white;
    color: skyblue;
}
.nav-img{
    padding-top: 60px;
} */
</style>