<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-sm-12">
        <h4 class="text-primary mb-4">Messages</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div v-for="(message,index) in messages" :key="index">
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <p>{{message.data.message}}</p>
                  <p>- Sent by {{message.data.name}} ( {{message.data.email}} on {{new Date(message.data.timestamp.seconds * 1000)}} )</p>
                </div>
              </div>
            </div>
          </div>
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
      messages: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    var db = firebase.firestore();
    db.collection("messages")
      .orderBy("timestamp","desc")
      .limit(100)
      .get()
      .then(querySnapshot => {
        let mymessages = [];
        querySnapshot.forEach(doc => {
          mymessages.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.messages = mymessages;
      });
  }
};
</script>