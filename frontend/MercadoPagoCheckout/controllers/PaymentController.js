class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    async getMercadoPagoLink(req, res) {
        const { name, price, unit, img, id, description, category , user} = req.body;
        try {
            const checkout = await this.paymentService.createPaymentMercadoPago(
                name,
                price,
                unit,
                img,
                id,
                description,
                category,
                user
            );
            console.log(checkout.init_point)
            let url = checkout.init_point
            res.json(url)
            return  url;
        } catch (err) {

            return res.status(500).json({
                error: true,
                msg: "Hubo un error con Mercado Pago"
            });
        }
    }

    webhook(req, res) {
        if (req.method === "POST") {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                console.log(body, "webhook response");
                res.end("ok");
            });
        }
        return res.status(200);
    }
}

module.exports = PaymentController;
