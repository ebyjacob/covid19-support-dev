<template>
  <div class="app">
    <DefaultHeader />
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import nav from "@/nav";
import DefaultHeader from "./DefaultHeader";
import {
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  Breadcrumb
} from "@coreui/vue";
export default {
  components: {
    DefaultHeader,
    AppSidebar,
    SidebarHeader,
    SidebarForm,
    SidebarNav,
    SidebarFooter,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>

<style>
</style>