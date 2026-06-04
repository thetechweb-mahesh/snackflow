<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
{
    DB::beginTransaction();

    try {

        $total = 0;

        foreach ($request->items as $cartItem) {

            $item = Item::findOrFail(
                $cartItem['item_id']
            );

            $total += (
                $item->price *
                $cartItem['qty']
            );
        }

        $order = Order::create([
            'shop_id' => auth()->user()->shop_id,
            'invoice_no' => 'INV-' . time(),
            'total' => $total,
            'payment_method' =>
                $request->payment_method
        ]);

        foreach ($request->items as $cartItem) {

            $item = Item::findOrFail(
                $cartItem['item_id']
            );

            OrderItem::create([
                'order_id' => $order->id,
                'item_id' => $item->id,
                'qty' => $cartItem['qty'],
                'price' => $item->price,
                'subtotal' =>
                    $item->price *
                    $cartItem['qty']
            ]);
        }

        DB::commit();

        return response()->json([
            'success' => true,
            'message' => 'Order Created',
            'order' => $order
        ]);

    } catch (\Exception $e) {

        DB::rollBack();

        return response()->json([
            'message' => $e->getMessage()
        ],500);
    }
}
}
