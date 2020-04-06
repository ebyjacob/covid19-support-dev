<template>
  <div class="container pt-4">
      <div class="row">
          <div class="col-sm-12">
              <h4 class="text-primary mb-4">Application Settings</h4>
              <div v-if="error" class="alert alert-danger">{{error}}</div>
              <div v-if="status==='submitted'" class="alert alert-success">Settings saved successfully.</div>
              <div class="row mt-4">
                  <div class="col-sm-4 text-right">Application Title</div>
                  <div class="col-sm-8">
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                        <input
                            id="applicationtitle"
                            type="text"
                            placeholder="Application Title"
                            class="form-control"
                            v-model="app_settings.app_title"
                        />
                        </div>
                    </fieldset>
                  </div>
                  <!-- <div class="col-sm-4 text-right">Contact us page description</div>
                  <div class="col-sm-8">
                      <fieldset role="group" class="b-form-group form-group">
                        <div role="group" class>
                        <textarea
                            id="page_contactus"
                            type="text"
                            placeholder="Contact Us Page"
                            class="form-control"
                            v-model="app_settings.page_contactus"
                            rows="10"
                        ></textarea>
                        </div>
                    </fieldset>
                  </div> -->
                  <div class="col-sm-12 text-center">
                      <button class="btn btn-primary" @click="saveSettings" >Update Settings</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateApplicationSettings } from "@/app/backend.js";
export default {
    data(){
        return {
            error: "",
            status: ""
        }
    },
    computed: {
        ...mapGetters({
            user: "user",
            app_settings: "app_settings"
        })
    },
    methods: {
        async saveSettings(){
            if(this.user && this.user.data && this.user.data.admin){
                try{
                    let res = await updateApplicationSettings(this.app_settings, this.user.data.email);
                    this.error = "";
                    this.status = "submitted"
                } catch(ex){
                    this.error = "Failed to update the settings";
                    this.status = "";
                }
            } else {
                this.error = "You don't have permissions to edit the settings";
                this.status = "";
                this.$router.replace({ name: "login" });
            }
        }
    }

}
</script>