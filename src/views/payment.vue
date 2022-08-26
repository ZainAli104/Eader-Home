<template>
    <div class="main">
        <v-dialog v-model="loading" max-width="600" width="200" persistent>
            <v-card style="padding: 20px; text-align: left; display: flex; align-items: center">
                <v-progress-circular indeterminate color="primary" />
                <p style="margin-left: 20px; margin-bottom: 0;">Please wait</p>
            </v-card>
        </v-dialog>

        <div class="billingDetails">
            <v-form class="form" @submit.prevent="placeOrder" ref="form" lazy-validation>
                <v-card-title>BILLING DETAILS</v-card-title>
                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.firstName" label="First Name" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.lastName" label="Last Name" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.country" label="Country Name" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.state" label="State Name" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.city" label="City Name" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.street" label="Street Address" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field v-model="orderDetails.street2" label="Street Address 2 (Optional)" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" v-model="orderDetails.postCode" label="Postcode" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required()]" type="number" v-model="orderDetails.phone" label="Phone"
                        outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-text-field :rules="[required(), email()]" type="email" v-model="orderDetails.Email"
                        label="Email Address" outlined>
                    </v-text-field>
                </v-col>

                <v-col>
                    <v-btn dark @click="placeOrder">Next</v-btn>
                </v-col>
            </v-form>
        </div>
    </div>
</template>

<script>
import { required, email } from '../utils/validators';

import { orders } from '../firebase';
import { addDoc } from '@firebase/firestore';

export default {
    data() {
        return {
            loading: false,
            orderDetails: {
                firstName: null,
                lastName: null,
                country: null,
                street: null,
                street2: null,
                state: null,
                city: null,
                postCode: null,
                phone: null,
                Email: null,
                date: new Date(),
                cart: null
            },
            country: "Australia",
            statesLoading: false,
            citiesLoading: false,
            states: [],
            cities: [],
        }
    },
    methods: {
        required, email,

        async placeOrder() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                try {
                    const addedDoc = await addDoc(orders, this.orderDetails);
                    console.log(addedDoc)
                    this.loading = false
                    this.$router.push("/checkout")
                }
                catch (e) {
                    console.log(e)
                    alert(e)
                }
            }
        },


        loadCarts() {
            this.orderDetails.cart = JSON.parse(localStorage.getItem('cart'));
        }
    },
    mounted() {
        this.loadCarts()
    }
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.billingDetails {
    width: 60%;
    padding: 0px 10px;
    margin-bottom: 20px;
}

@media only screen and (max-width: 800px) {
    .billingDetails {
        width: 100%;
    }
}
</style>