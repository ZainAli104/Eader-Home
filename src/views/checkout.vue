<template>
    <div>
        <div class="yourProduct">
            <div class="productDeatils">
                <v-card-title>YOUR ORDER</v-card-title>
                <v-data-table :headers="headers" :items="cartItems" hide-default-footer class="elevation-1">
                    <template v-slot:item.subTotal="{ item }">
                        <h4>{{ "$" + item.subTotal }}</h4>
                    </template>
                </v-data-table>
                <table id="table" style="width: 100%">
                    <tbody>
                        <tr>
                            <th>Subtotal</th>
                            <td>{{ "$" + totalprice }}</td>
                        </tr>
                        <tr>
                            <th>Shipping</th>
                            <td>Free Shipping</td>
                        </tr>
                        <tr>
                            <th>Coupon</th>
                            <td v-show="clickCpn">
                                <v-btn @click="coppen" dark color="green">Apply coupon</v-btn>
                            </td>
                            <td v-show="showCpn">
                                <v-form class="form" @submit.prevent="coupen" ref="form" lazy-validation>
                                    <v-text-field class="input" type="text" v-model="copen" :rules="[required(), cpn()]"
                                        outlined>
                                    </v-text-field>
                                    <v-btn type="submit" dark color="green">Apply Coupon</v-btn>
                                </v-form>
                            </td>
                            <td v-show="cpnText">
                                <h4>Eader 10% Discount</h4>
                            </td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td v-if="this.per == true">{{ "$" + totalDprice }}</td>
                            <td v-else>{{ "$" + totalprice }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="margin-top: 30px;">
                <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
                    :success-url="successUrl" :cancel-url="cancelUrl" @loading="(v) => (loading = v)"
                    :shipping-address-collection="address"></stripe-checkout>
                <button style="padding: 10px 40px; background-color: #4CAF50; color: white; border-radius: 5px;"
                    @click="payNow">Proceed to Payment</button>
            </div>
        </div>
    </div>
</template>

<script>

import { required, cpn } from "../utils/validators";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

export default {
    data() {
        this.publishableKey =
            "pk_live_51LWF7HJwluYHHjdachRvCgFgPNGVFdGSQ6FodkFoFrT9wF9zMk7ISrMJs4nh0JfRBA6NnxN8BbCF4s7aLHZ2gZSD002ReUaAZK";

        return {
            clickCpn: true,
            showCpn: false,
            cpnText: false,
            per: false,
            copen: null,
            product: {
                price: null,
            },
            carts: [],
            stripeCarts: [],
            stripeDCarts: [],
            headers: [
                { text: "Product", value: "productTitle" },
                { text: "SubTotal", value: "subTotal" },
            ],
            Order: null,
            loading: false,
            lineItems: [],
            successUrl: "https://eader-home.web.app/",
            cancelUrl: "https://eader-home.web.app/checkout",
            address: {
                allowedCountries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW', 'ZZ']
            }
        };
    },
    methods: {
        required,
        cpn,

        loadCarts() {
            this.carts = JSON.parse(localStorage.getItem("cart"));
            this.stripeCarts = JSON.parse(localStorage.getItem("stripeCart"));
            this.stripeDCarts = JSON.parse(localStorage.getItem("stripeDCart"));
        },

        refresh() {
            if (this.per == true) {
                this.product.price = this.totalprice * 0.9;
            } else {
                this.product.price = this.totalprice;
            }
        },

        coupen() {
            if (this.$refs.form.validate()) {
                this.per = true;
                this.showCpn = false;
                this.cpnText = true;
                this.lineItems = this.stripeDCartItems
            }
        },

        coppen() {
            (this.showCpn = true), (this.clickCpn = false);
        },

        payNow() {
            this.$refs.checkoutRef.redirectToCheckout();
        },

    },
    computed: {
        cartItems() {
            return Object.values(this.carts);
        },
        stripeCartItems() {
            return Object.values(this.stripeCarts);
        },
        stripeDCartItems() {
            return Object.values(this.stripeDCarts);
        },
        totalprice() {
            return this.cartItems
                .reduce((prev, value) => prev + value["subTotal"], 0)
                .toFixed(2);
        },
        totalDprice() {
            const first = this.totalprice / 10
            const second = this.totalprice - first
            return second
        }
    },
    mounted() {
        this.loadCarts();
        this.lineItems = this.stripeCartItems
        window.setInterval(() => {
            this.refresh();
        }, 300);
    },
    components: {
        StripeCheckout,
    },
};
</script> 

<style scoped>
.form {
    width: 30%;
}

@media (max-width: 600px) {
    .form {
        width: 100%;
    }
}
</style>

<style>
.yourProduct {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.productDeatils {
    width: 95%;
}

.paypal {
    display: flex;
    flex-direction: column;
}

.paypalContent {
    padding: 10px 20px;
}

.paypalBtn {
    margin-left: 20%;
}

@media only screen and (max-width: 600px) {
    .paypalBtn {
        margin: 0px;
    }
}
</style>