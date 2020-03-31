<template>
  <div>
    <div class="container mt-4">
      <div v-if="user && user.loggedIn">
        <div class="row">
          <div class="col-md-12">
            <h4>Support Requests</h4>
          </div>
        </div>
        <!-- <div class="row mt-4">
          <div class="col-sm-12"  v-if="mysupportrequests">
            <div class="card">
              <div class="card-header">Your Support Requests</div>
              <div class="card-body">
                <div v-for="mysupportrequest in mysupportrequests" :key="mysupportrequest.id">
                  <span class="text-primary" style="font-size:24px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'support-request', params: { supportrequestid: mysupportrequest.id }}"
                    >{{mysupportrequest.data.request.title}}</router-link>
                  </span>
                  <br />
                  For {{ mysupportrequest.data.contact.name || mysupportrequest.data.contact.email }} by
                  <i>{{mysupportrequest.data.user_displayName || mysupportrequest.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <p>{{mysupportrequest.data.request.detail}}</p>
                  <router-link
                    :to="{ name: 'support-request', params: { supportrequestid: mysupportrequest.id }}"
                  >More details</router-link>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>You are not logged in</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mysupportrequests: null
    };
  },
  created() {
    var db = firebase.firestore();
    db.collection("support_requests")
      .where("user_email", "==", this.user.data.email)
      .get()
      .then(querySnapshot => {
        let support_requests = [];
        querySnapshot.forEach(doc => {
          support_requests.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.mysupportrequests = support_requests;
      });
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>