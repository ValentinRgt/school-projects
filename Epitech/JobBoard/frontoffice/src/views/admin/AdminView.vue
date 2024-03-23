<template>
  <AdminHeader />
  <RouterView />
</template>

<script>
import AdminHeader from '../../components/admin/Header.vue'
export default {
  components: {
    AdminHeader
  }
}
</script>
