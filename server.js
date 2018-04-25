var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var module = require('ebanx');
var ebanx = new module();

ebanx.configure({
    integrationKey: 'test_ik_gByZFs3m9v3BMnU5RGgMXQ',
    testMode: true
});

app.use(bodyParser.json());

app.post('/checkout', function (req, res) {

    // console.log('Requisição recebida');

    data = req.body;

    var params = {
        payment: {
            name: data.name,
            email: data.email,
            document: data.document,
            address: data.address,
            street_number: data.street_number,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            country: data.country,
            phone_number: data.phone_number,
            payment_type_code: data.payment_type_code,
            merchant_payment_code: Math.random().toString(36).substring(2),
            currency_code: data.currency_code,
            amount_total: data.amount_total,

            creditcard: {
                card_name: data.card_name,
                card_due_date: data.card_due_date,
                card_number: data.card_number,
                card_cvv: data.card_cvv,
                auto_capture: true
            }
        }
    };

    ebanx.direct(params, function (err, reply) {
        if (err) {
            res.send(err);
        } else {
            res.send(reply);
        }
    });
});

app.listen(8000, function () {
    console.log('Servidor rodando na porta 8000');
    console.log('URL POST para checkout - http://localhost:8000/checkout');
});