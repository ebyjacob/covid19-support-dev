<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-sm-12 my-2 text-right">
        <router-link to="/groups/create">
          <button class="btn btn-primary">Create Group</button>
        </router-link>
      </div>
      <div class="col-sm-12 my-2">
        <div class="card">
          <div class="card-header">List of Groups</div>
          <div class="card-body" v-if="groups.length>0">
            <div class="row my-2" v-for="(group,index) in groups" :key="index">
              <div class="col-sm-12">
                <span>
                  <router-link :to="{ name:'group', params: {groupid: group.id}}">
                    <b>{{group.data.groupname}}</b>
                  </router-link>
                </span>
                - {{group.data.members.length}} members
                <p>{{group.data.groupdescription}}</p>
              </div>
            </div>
          </div>
          <div class="card-body text-center" v-else>
            <h4>Sorry! No Groups found.</h4>
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
      groups: []
    };
  },
  created() {
    var db = firebase.firestore();
    db.collection("groups")
      .orderBy("created_on", "desc")
      .limit(100)
      .get()
      .then(querySnapshot => {
        let groups = [];
        querySnapshot.forEach(doc => {
          groups.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.groups = groups;
      });
  }
};
</script>

<style>
</style>