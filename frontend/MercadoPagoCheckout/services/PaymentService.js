const axios = require("axios");

class PaymentService {
    constructor() {
        this.tokensMercadoPago = {
            prod: {},
            test: {
                access_token:
                    "TEST-1226616225932370-110521-889e1ad9691e7f6c481c8ff6be8e1f9f-1013403171"
            }
        };
        this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
    }

    async createPaymentMercadoPago(name, price, unit, img, id, description, category, user) {
        const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
        const items = [
            {
                id: id,
                title: name,
                description: description,
                picture_url: img,
                category_id: category,
                quantity: parseInt(unit),
                currency_id: "ARS",
                unit_price: parseFloat(price)
            }
        ];

        const preferences = {
            items,
            external_reference: "Gaming-Libre",
            payer: {
                name: user.firstName,
                surname: user.lastName,
                email: user.email,
                phone: {
                    area_code: "11",
                    number: user.phone
                },
                address: {
                    zip_code: user.postalCode,
                    street_name: user.address,
                    street_number: user.address
                }
            },
            payment_methods: {
                excluded_payment_types: [{id: "atm"}],
                installments: 18,
                default_installments: 1
            },
            back_urls: {
                success: "http://localhost:3000/success",
                pending: "http://localhost:3000.com/pending",
                failure: "http://localhost:3000.com/error"
            },
            notification_url: "https://mercadopago-checkout.herokuapp.com/webhook",
            auto_return: "approved"
        };

        try {
            const request = await axios.post(url, preferences, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return request.data;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = PaymentService;
