<template>
  <div>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body bg-primary text-center p-4">
              <router-link to="/need/help" class="text-white">
                <h4><i class="fa fa-life-ring fa-lg my-2"></i></h4>
                <h4>Need Help?</h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body bg-primary text-center p-4">
              <router-link to="/can/help" class="text-white">
                <h4><i class="fa fa-heart fa-lg my-2"></i></h4>
                <h4>Can Help?</h4>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body bg-primary text-center p-4">
              <router-link to="/donate" class="text-white">
                <h4><i class="fa fa-gift fa-lg my-2"></i></h4>
                <h4>Donate</h4>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5>Recent Support requests</h5>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5>Featured Support requests</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>