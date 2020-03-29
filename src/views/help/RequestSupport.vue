<template>
  <div>
      <div class="container mt-4">
          <div class="animated fadeIn">
              <div class="row">
                  <div class="col-sm-12">
                      <div class="card">
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-sm-12">
                                      <h4 class="mb-4 text-primary">What support you need?</h4>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <fieldset role="group" class="b-form-group form-group">
                                          <div role="group" class="">
                                      <input
                                        id="helptitle"
                                        type="text"
                                        placeholder="Short intro of what type of support need"
                                        class="form-control"
                                        />
                                          </div>
                                      </fieldset>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <fieldset role="group" class="b-form-group form-group">
                                          <div role="group" class="">
                                              <textarea id="helptitle" type="text" placeholder="Description of what you need" class="form-control" rows="3" />
                                            </div>
                                        </fieldset>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="card">
                          <div class="card-header">
                              <div>
                                  <strong>Requestor details</strong>
                              </div>
                          </div>
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-sm-12">
                                          <fieldset role="group" class="b-form-group form-group">
                                            <div role="group" class="">
                                                <label for="requestfor">Requesting for</label>
                                                <div id="requestfor" role="radiogroup" tabindex="-1" class="">
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="requestfor1" name="requestfor" value="1" checked="checked" class="custom-control-input">
                                                        <label for="requestfor1" class="custom-control-label">Self</label>
                                                    </div>
                                                    <div class="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="requestfor2" name="requestfor" value="2" class="custom-control-input">
                                                        <label for="requestfor2" class="custom-control-label">On behalf others</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="card">
                          <div class="card-header">
                              <div>
                                  <strong>Details of person requiring support</strong>
                              </div>
                          </div>
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-sm-12">
                                      <fieldset role="group" class="b-form-group form-group">
                                          <div role="group" class="">
                                              <label for="fullname">Full Name</label>
                                              <input id="fullname" type="text" placeholder="Full name of the person required support" class="form-control">
                                            </div>
                                        </fieldset>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-12">
                                      <fieldset role="group" class="b-form-group form-group">
                                          <div role="group" class="">
                                              <label for="address">Address</label>
                                              <input id="address" type="text" placeholder="Address" class="form-control">
                                            </div>
                                        </fieldset>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col-sm-6">
                                      <fieldset role="group" class="b-form-group form-group">
                                          <div role="group" class="">
                                              <label for="phonenumber">Phone Number</label>
                                              <input id="phonenumber" type="text" placeholder="Phone number" class="form-control">
                                            </div>
                                        </fieldset>
                                  </div>
                                  <div class="col-sm-6">
                                      <fieldset role="group" class="b-form-group form-group">
                                          <div role="group" class="">
                                              <label for="email">Email</label>
                                              <input id="email" type="text" placeholder="Email" class="form-control">
                                            </div>
                                        </fieldset>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="card">
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-sm-8">
                                      <div>
                                        <p>By submitting, I am agreeing the T&C and sharing all the above information with the support team.</p>
                                    </div>
                                  </div>
                                  <div class="col-sm-4">
                                        <div class="text-right mr-4">
                                            <button type="button" class="btn btn-primary">Agree & Submit Request</button>
                                        </div>   

                                  </div>
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
export default {

}
</script>

<style>

</style>