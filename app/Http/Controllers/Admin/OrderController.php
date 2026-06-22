<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    public function index()
{
    // return Order::where(
    //     'shop_id',
    //     auth()->user()->shop_id
    // )
    // ->latest()
    // ->get();
     return Order::with('customer')
        ->where(
            'shop_id',
            auth()->user()->shop_id
        )
        ->latest()
        ->get();
}
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
            //
            'customer_id' =>
        $request->customer_id,
            //
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
                    , 'status' => 'completed'
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


public function show($id)
{
    $order = Order::with([
        'items.item'
    ])
    ->where(
        'shop_id',
        auth()->user()->shop_id
    )
    ->findOrFail($id);

    return response()->json(
        $order
    );
}

public function download($id)
{
    $order = Order::with([
        'items.item'
    ])
    ->where(
        'shop_id',
        auth()->user()->shop_id
    )
    ->findOrFail($id);

    $pdf = Pdf::loadView(
        'pdf.invoice',
        compact('order')
    );

    return $pdf->download(
        $order->invoice_no . '.pdf'
    );
}



//

public function updateStatus(
    Request $request,
    $id
)
{
    $request->validate([
        'status' =>
            'required|in:pending,completed,cancelled'
    ]);

    $order = Order::where(
        'shop_id',
        auth()->user()->shop_id
    )->findOrFail($id);

    $order->update([
        'status' => $request->status
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Status Updated'
    ]);
}
}
