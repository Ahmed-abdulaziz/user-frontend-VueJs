<template>
    <div class="container mt-5">
      <h2>Update User</h2>
      <form @submit.prevent="submitUpdate">
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" v-model="user.name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" v-model="user.email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Profile Image:</label>
          <input type="file" @change="handleImageUpload" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
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
        },
        image: null,
      };
    },
    async created() {
      await this.fetchUser();
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
      handleImageUpload(event) {
        this.image = event.target.files[0];
      },
      async submitUpdate() {
        const formData = new FormData();
        formData.append('name', this.user.name);
        formData.append('email', this.user.email);
        if (this.image) {
          formData.append('image', this.image);
        }
  
        try {
          await axios.post(`http://localhost:8000/api/users/${this.$route.params.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          if (this.image) {
            const imageFormData = new FormData();
            imageFormData.append('image', this.image);
            imageFormData.append('user_id', this.$route.params.id);
            await axios.post('http://localhost:8001/api/images/upload', imageFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }
  
          alert('User updated successfully!');
          this.$router.push(`/users/${this.$route.params.id}`);
        } catch (error) {
          alert('Error updating user');
          console.error(error);
        }
      },
    },
  };
  </script>