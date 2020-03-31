<template>
  <div>
    <div class="container mt-4">
      <div class="row" v-if="user && user.loggedIn">
        <div class="col-sm-12">
          <div class="card mt-4">
            <div class="card-body" v-if="donation && donation.donation">
              <h4 class="text-primary">{{donation.donation.title}}</h4><br/>
              {{donation.donation.message}}
              <br /><br/>
              {{donation}}
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12">
          <h4>You haven't logged in</h4>
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
      donation: {}
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    if (
      this.user &&
      this.user.data &&
      this.user.data.email &&
      this.$route.params.donationid
    ) {
      var db = firebase.firestore();
      db.collection("donations")
        .doc(this.$route.params.donationid)
        .get()
        .then(docRef => {
          this.donation = docRef.data();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>