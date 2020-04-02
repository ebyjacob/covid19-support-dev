<template>
  <AppHeader fixed>
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="/welcome">
      <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoViD-19" />
      <img
        class="navbar-brand-minimized"
        src="img/brand/sygnet.svg"
        width="30"
        height="30"
        alt="CoViD-19"
      />
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen="false" />
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" to="/need/support">
        <b>Need Support?</b>
      </b-nav-item>
      <b-nav-item class="px-3" to="/can/support">
        <b>Can Support?</b>
      </b-nav-item>
      <b-nav-item class="px-3" to="/donate">
        <b>Donate</b>
      </b-nav-item>
      <b-nav-item class="px-3" to="/support-requests" v-if="user.loggedIn && user.data && (user.data.admin || user.data.moderator || user.data.verifiedvolunteer)">Support Requests</b-nav-item>
      <b-nav-item class="px-3" to="/volunteers"   v-if="user.loggedIn && user.data && (user.data.admin || user.data.moderator)">Volunteers</b-nav-item>
      <b-nav-item class="px-3" to="/donations"  v-if="user.loggedIn && user.data && (user.data.admin || user.data.moderator)">Donations</b-nav-item>
      <b-nav-item class="px-3" to="/admin/messages"  v-if="user.loggedIn && user.data && (user.data.admin || user.data.moderator)">Messages</b-nav-item>
      <b-nav-item class="px-3" to="/admin/manage"  v-if="user.loggedIn && user.data && (user.data.admin || user.data.moderator || user.data.verifiedvolunteer )">Manage Users</b-nav-item>
      <b-nav-item class="px-3" to="/about">About</b-nav-item>
      <b-nav-item class="px-3" to="/contact">Contact US</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" style="margin-right:20px;">
      <template  v-if="user.loggedIn">
        <b-nav-item class="d-md-down-none">
          <b-nav-item v-if="user" class="px-3">Hi <router-link to="/profile"><b>{{user.data.displayName}}</b></router-link></b-nav-item>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <b-nav-item v-if="user" class="pr-3" @click.prevent="signOut">Signout</b-nav-item>
        </b-nav-item>
      </template>
      <template v-else>
        <b-nav-item class="d-md-down-none">
          <b-nav-item class="px-3" to="/register">Register</b-nav-item>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <b-nav-item class="px-3" to="/login">Login</b-nav-item>
        </b-nav-item>
      </template>
    </b-navbar-nav>
  </AppHeader>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import { Header as AppHeader, SidebarToggler, AsideToggler } from "@coreui/vue";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
export default {
  name: "DefaultHeader",
  components: {
    AsideToggler,
    AppHeader,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    }
  }
};
</script>