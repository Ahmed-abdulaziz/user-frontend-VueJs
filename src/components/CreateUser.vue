<template>
    <div class="container mt-5">
      <h2>Create User</h2>
      <form @submit.prevent="createUser">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" v-model="user.name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" v-model="user.email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input type="password" v-model="user.password" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Profile Image:</label>
          <input type="file" @change="handleImageUpload" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Create User</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
        },
        image: null,
      };
    },
    methods: {
      handleImageUpload(event) {
        this.image = event.target.files[0];
      },
      async createUser() {
        const formData = new FormData();
        formData.append('name', this.user.name);
        formData.append('email', this.user.email);
        formData.append('password', this.user.password);
        if (this.image) {
          formData.append('image', this.image);
        }
  
        try {
            // eslint-disable-next-line no-unused-vars
            const response =  await axios.post('http://localhost:8000/api/users', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
       console.log(response.data.data.id);
          if (this.image) {
            const imageFormData = new FormData();
            imageFormData.append('image', this.image);
            imageFormData.append('user_id', response.data.data.id);
            await axios.post('http://localhost:8001/api/images/upload', imageFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }
          alert('User created successfully!');
          this.$router.push('/');
        } catch (error) {
          alert('Error creating user');
          console.error(error);
        }
      },
    },
  };
  </script>