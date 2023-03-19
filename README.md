<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></script>
    <form action="result.php" method="post">
        <button type="submit" id="payhere-payment" >PayHere Pay</button>
    </form>
    <!-- <button type="submit" id="payhere-payment" >PayHere Pay</button> -->
    <script>
        // Payment completed. It can be a successful failure.
        payhere.onCompleted = function onCompleted(orderId) {
            console.log("Payment completed. OrderID:" + orderId);
            // Note: validate the payment and show success or failure page to the customer
        };

        // Payment window closed
        payhere.onDismissed = function onDismissed() {
            // Note: Prompt user to pay again or show an error page
            console.log("Payment dismissed");
        };

        // Error occurred
        payhere.onError = function onError(error) {
            // Note: show an error page
            console.log("Error:"  + error);
        };

        // Put the payment variables here
        var payment = {
            "sandbox": true,
            "merchant_id": "4OVx3Ve14Pw4JDDSE7nxJ33PO",    // Replace your Merchant ID
            "return_url": "./done.html",     // Important
            "cancel_url": "./done.html",     // Important
            "notify_url": "./done.html",
            "order_id": "ItemNo12345",
            "items": "Door bell wireles",
            "payhere_amount": "1000.00",
            "payhere_currency": "LKR",
            "hash": "45D3CBA93E9F2189BD630ADFE19AA6DC", // *Replace with generated hash retrieved from backend
            "first_name": "Saman",
            "last_name": "Perera",
            "email": "samanp@gmail.com",
            "phone": "0771234567",
            "address": "No.1, Galle Road",
            "city": "Colombo",
            "country": "Sri Lanka",
            "delivery_address": "No. 46, Galle road, Kalutara South",
            "delivery_city": "Kalutara",
            "delivery_country": "Sri Lanka",
            "custom_1": "",
            "custom_2": ""
        };

        // var hash = strtoupper(
        //     md5(
        //         $merchant_id + 
        //         $order_id + 
        //         number_format($amount, 2, '.', '') . 
        //         $currency .  
        //         strtoupper(md5($merchant_secret)) 
        //     ) 
        // );

        // Show the payhere.js popup, when "PayHere Pay" is clicked
        document.getElementById('payhere-payment').onclick = function (e) {
            payhere.startPayment(payment);
        };
    </script>
</body>
</html>
