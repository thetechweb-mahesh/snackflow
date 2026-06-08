<!DOCTYPE html>
<html>
<head>
    <title>Invoice</title>
</head>
<body>

<h2>{{ $order->invoice_no }}</h2>

<table width="100%" border="1" cellspacing="0">

    <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Subtotal</th>
    </tr>

    @foreach($order->items as $row)

    <tr>
        <td>{{ $row->item->name }}</td>
        <td>{{ $row->qty }}</td>
        <td>{{ $row->price }}</td>
        <td>{{ $row->subtotal }}</td>
    </tr>

    @endforeach

</table>

<h3>
Total : ₹{{ $order->total }}
</h3>

</body>
</html>