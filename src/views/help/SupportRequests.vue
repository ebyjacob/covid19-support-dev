<template>
  <div>
    <div class="container mt-4">
      <div v-if="user && user.loggedIn">
        <div class="row mt-4">
          <div class="col-sm-12"  v-if="supportrequests">
            <div class="card">
              <div class="card-header">All Support Requests</div>
              <div class="card-body">
                <div v-for="supportrequest in supportrequests" :key="supportrequest.id">
                  <span class="text-primary" style="font-size:24px;font-weight:bold;">
                    <router-link
                      :to="{ name: 'supportrequest', params: { supportrequestid: supportrequest.id }}"
                    >{{supportrequest.data.request.title}}</router-link>
                  </span> - <span style="font-size:16px;font-weight:light;">{{supportrequest.data.request.status || 'new'}}</span>
                  <br />
                  For {{ supportrequest.data.contact.name || supportrequest.data.contact.email }} by
                  <i>{{supportrequest.data.user_displayName || supportrequest.data.user_email || 'Unknown User' }}</i>
                  <br />
                  <p>{{supportrequest.data.request.detail}}</p>
                  <router-link
                    :to="{ name: 'supportrequest', params: { supportrequestid: supportrequest.id }}"
                  >More details</router-link>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
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
      supportrequests: null
    };
  },
  created() {
    var db = firebase.firestore();
    db.collection("support_requests")
      .orderBy("timestamp","desc")
      .get()
      .then(querySnapshot => {
        let support_requests = [];
        querySnapshot.forEach(doc => {
          support_requests.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.supportrequests = support_requests;
      });
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>