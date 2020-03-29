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
                        <h4 class="mb-4 text-primary">How can you support us?</h4>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <input
                          id="helptitle"
                          type="text"
                          placeholder="Short intro of what type of support you can provide"
                          class="form-control"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <textarea
                          rows="3"
                          id="helptitle"
                          type="text"
                          placeholder="Description of what you can support"
                          class="form-control"
                        />
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
                    <div class="row">
                      <div class="col-sm-3">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <label for="name">Locations you can support</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-sm-9">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <input
                              id="helptitle"
                              type="text"
                              placeholder="Locations you can suppport"
                              class="form-control"
                            />
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-3">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <label for="name">Timings you can support</label>
                          </div>
                        </fieldset>
                      </div>
                      <div class="col-sm-9">
                        <fieldset role="group" class="b-form-group form-group">
                          <div role="group" class>
                            <input
                              id="helptitle"
                              type="text"
                              placeholder="Timings you can support"
                              class="form-control"
                            />
                          </div>
                        </fieldset>
                      </div>
                    </div>
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
                  <strong>Details of person offering support</strong>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="fullname">Full Name</label>
                        <input
                          id="fullname"
                          type="text"
                          placeholder="Full name of the person offering support"
                          class="form-control"
                        />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="address">Address</label>
                        <input id="address" type="text" placeholder="Address" class="form-control" />
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="phonenumber">Phone Number</label>
                        <input
                          id="phonenumber"
                          type="text"
                          placeholder="Phone number"
                          class="form-control"
                        />
                      </div>
                    </fieldset>
                  </div>
                  <div class="col-sm-6">
                    <fieldset role="group" class="b-form-group form-group">
                      <div role="group" class>
                        <label for="email">Email</label>
                        <input id="email" type="text" placeholder="Email" class="form-control" />
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
export default {};
</script>

<style>
</style>