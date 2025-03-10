<template>
    <div class="container mt-5">
      <h2>User List</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <!-- زر عرض البروفايل -->
              <router-link :to="`/users/${user.id}`" class="btn btn-primary btn-sm me-2">
                <i class="fas fa-eye"></i> View
              </router-link>
  
              <!-- زر التحديث -->
              <router-link :to="`/users/${user.id}/edit`" class="btn btn-warning btn-sm me-2">
                <i class="fas fa-edit"></i> Edit
              </router-link>
  
              <!-- زر الحذف -->
              <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">
                <i class="fas fa-trash"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    async created() {
      await this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:8000/api/users');
          this.users = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
          try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`);
            await axios.delete(`http://localhost:8001/api/images/${userId}`);
            alert('User deleted successfully!');
            this.fetchUsers(); // إعادة تحميل قائمة المستخدمين بعد الحذف
          } catch (error) {
            alert('Error deleting user');
            console.error(error);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .btn {
    margin-right: 5px;
  }
  </style>