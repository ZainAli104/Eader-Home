<template>
  <v-dialog :value="flag" @input="$emit('value', false)" width="470">
    <v-card style="padding: 10px 0">
      <sweetalert-icon icon="success" />

      <v-card-title
        style="font-family: google-sans, sans-serif; font-size: 24px; font-weight: 600; display: flex; justify-content: center;">
        Your Product is added to cart
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn color="#38872c" dark elevation="0" @click="viewCart">View Cart</v-btn>
        <v-btn color="#38872c" dark elevation="0" @click="$emit('value', false)">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorDialog",

  methods: {
    viewCart() {
      this.$router.push('/cart')
    }
  },

  model: {
    prop: 'flag',
    event: 'value'
  },

  props: {
    flag: {
      type: Boolean,
      default: false
    },

    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
