<template>
  <v-row align="center" justify="center">
    <v-col>
      <v-card
        d-flex
        align-content-space-around
        flex-wrap
        elevation="12"
        outlined
        class="rounded-lg"
      >
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row>
              <v-col>
                <v-card-text>
                  <h1
                    :class="`text-center display-${display} black--text font-black-bold`"
                  >
                    Sign in to Jetlight
                  </h1>
                  <div class="text-center mt-2">
                    <v-btn
                      class="mx-sm-1 mx-md-2 mx-lg-4 mx-xl-8"
                      fab
                      color="black"
                      outlined
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-sm-1 mx-md-2 mx-lg-4 mx-xl-8"
                      fab
                      color="black"
                      outlined
                    >
                      <v-icon>mdi-google</v-icon>
                    </v-btn>
                    <v-btn
                      class="mx-sm-1 mx-md-2 mx-lg-4 mx-xl-8"
                      fab
                      color="black"
                      outlined
                    >
                      <v-icon>mdi-linkedin</v-icon>
                    </v-btn>
                  </div>
                  <v-form class="mt-2">
                    <v-text-field
                      v-model="login.username"
                      label="Name"
                      name="Name"
                      prepend-icon="mdi-account"
                      color="#01579B"
                      class="mx-sm-4 mx-md-8 mx-lg-12 mx-xl-12 px-sm-4 px-md-8 px-lg-12 px-xl-12"
                      :style="`${cardTxtInputName}`"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      v-model="login.password"
                      label="Password"
                      name="Password"
                      prepend-icon="mdi-lock"
                      :rules="[rules.required, rules.min]"
                      :append-icon="passwordshow ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="passwordshow ? 'text' : 'password'"
                      color="#01579B"
                      class="mx-sm-4 mx-md-8 mx-lg-12 mx-xl-12 px-sm-4 px-md-8 px-lg-12 px-xl-12"
                      :style="`${cardTxtInputName}`"
                      hint="At least 8 characters"
                      counter
                      @click:append="passwordshow = !passwordshow"
                    ></v-text-field>
                  </v-form>
                  <h3 class="text-center mt-3">Forget your password ?</h3>
                </v-card-text>
                <div class="text-center mt-3">
                  <v-btn
                    rounded
                    dark
                    class="mb-3"
                    style="background: #082543"
                    @click="userLogin"
                    >SIGN IN</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" md="4" style="background: #082543">
                <v-card-text class="white--text mt-16 pt-16">
                  <h1
                    :class="`text-center display-${display} white--text font-white-bold`"
                  >
                    Hello, Friends !
                  </h1>
                  <h5 class="text-center">
                    Enter your personnel details and start journay with us
                  </h5>
                </v-card-text>
                <div class="text-center">
                  <v-btn class="mb-3" rounded dark outlined @click="step++"
                    >SIGN UP</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row class="fill-height">
              <v-col cols="12" md="4" style="background: #082543">
                <v-card-text class="white--text mt-16 pt-16">
                  <h1
                    :class="`text-center display-${display} white--text font-white-bold`"
                  >
                    Welcome Back
                  </h1>
                  <h5 class="text-center">
                    To Keep connected with us please login with your personel
                    info
                  </h5>
                </v-card-text>
                <div class="text-center">
                  <v-btn rounded class="mb-3" dark outlined @click="step--"
                    >SIGN IN</v-btn
                  >
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <v-card-text class="mt-12">
                  <h1
                    :class="`text-center display-${display} black--text font-black-bold`"
                  >
                    Create Account
                  </h1>
                  <div class="text-center mt-2">
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>mdi-google</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>mdi-linkedin</v-icon>
                    </v-btn>
                  </div>
                  <v-form class="mt-3">
                    <v-text-field
                      v-model="login.username"
                      label="Name"
                      name="Name"
                      prepend-icon="mdi-account"
                      :style="`${cardTxtInputName}`"
                      type="text"
                      color="#01579B"
                    ></v-text-field>
                    <v-text-field
                      v-model="login.password"
                      label="Password"
                      name="Password"
                      prepend-icon="mdi-lock"
                      :style="`${cardTxtInputName}`"
                      type="password"
                      color="#01579B"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <div class="text-center mt-n5">
                  <v-btn
                    rounded
                    dark
                    class="mb-3"
                    style="background: #082543"
                    @click="userLogin"
                    >SIGN UP</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  layout: 'auth',
  data() {
    return {
      step: 1,
      login: {
        username: '',
        password: '',
      },
      passwordshow: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    }
  },
  computed: {
    display() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '0'
        case 'sm':
          return '1'
        case 'md':
          return '2'
        case 'lg':
          return '3'
        default:
          return '3'
      }
    },
    cardTxtInputName() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'line-height:1.5rem; font-size:1rem;'
        case 'sm':
          return 'line-height:2rem; font-size:1.2rem;'
        case 'md':
          return 'line-height:2rem; font-size:1.4rem;'
        case 'lg':
          return 'line-height:2.5rem; font-size:1.6rem;'
        case 'xl':
          return 'line-height:2.5rem; font-size:1.8rem;'
        default:
          return 'line-height:2.5rem; font-size:2rem;'
      }
    },
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('monster', {
          data: this.login,
        })
        if (response.data.success) {
          this.$router.push('/')
        }
      } catch (err) {
        this.$router.push('/login')
      }
    },
  },
}
</script>
