<template>
    <div class="container mt-5">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h2 class="card-title">User Profile</h2>
        </div>
        <div class="card-body">
          <div v-if="user" class="text-center">
            <div class="mb-4">
              <img :src="imageUrl" alt="User Image" v-if="imageUrl" class="img-thumbnail rounded-circle" style="width: 150px; height: 150px;" />
            </div>
  
            <div class="mb-4">
              <p class="mb-2"><strong>Name:</strong> {{ user.name }}</p>
              <p class="mb-2"><strong>Email:</strong> {{ user.email }}</p>
            </div>
  
            <div class="d-flex justify-content-center gap-3">
              <router-link :to="`/users/${$route.params.id}/edit`" class="btn btn-primary">
                <i class="fas fa-edit"></i> Update User
              </router-link>
              <button @click="deleteUser" class="btn btn-danger">
                <i class="fas fa-trash"></i> Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
        imageUrl: null,
      };
    },
    async created() {
      await this.fetchUser();
      await this.fetchImage();
    },
    methods: {
      async fetchUser() {
        try {
          const response = await axios.get(`http://localhost:8000/api/users/${this.$route.params.id}`);
          this.user = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async fetchImage() {
        try {
          const response = await axios.get(`http://localhost:8001/api/images/${this.$route.params.id}`);
          if (response.data) {
            this.imageUrl = `${response.data}`;
          }
        } catch (error) {
          console.error(error);
        }
      },
      async deleteUser() {
        try {
          await axios.delete(`http://localhost:8000/api/users/${this.$route.params.id}`);
          await axios.delete(`http://localhost:8001/api/images/${this.$route.params.id}`);
          alert('User deleted successfully!');
          this.$router.push('/');
        } catch (error) {
          alert('Error deleting user');
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: none;
    border-radius: 15px;
  }
  
  .card-header {
    border-radius: 15px 15px 0 0;
  }
  
  .img-thumbnail {
    border: 3px solid #007bff;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 10px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    border-color: #c82333;
  }
  
  .d-flex.gap-3 > * {
    margin: 0 5px;
  }
  </style>