<?php

    echo "Inside php";

    $merchant_id         = $_POST['merchant_id'];
    $order_id            = $_POST['order_id'];
    $payhere_amount      = $_POST['payhere_amount'];
    $payhere_currency    = $_POST['payhere_currency'];
    $status_code         = 2; // $_POST['status_code'];
    // $md5sig              = $_POST['md5sig'];

    $merchant_secret = '8W98DU0cCRi4PZxbLh3fr64PVqGfPO2AE8gleOkmMSgs'; // Replace with your Merchant Secret
        
    $local_md5sig = strtoupper(
        md5(
            $merchant_id . 
            $order_id . 
            $payhere_amount . 
            $payhere_currency . 
            $status_code . 
            strtoupper(md5($merchant_secret)) 
        ) 
    );

    $md5sig = $local_md5sig;

    if (($local_md5sig === $md5sig) AND ($status_code == 2) ){
        echo "Inside if...!";
    }

?>
