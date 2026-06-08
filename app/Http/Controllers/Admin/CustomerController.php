<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::where(
            'shop_id',
            auth()->user()->shop_id
        )
        ->latest()
        ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'address' => 'nullable|string'
        ]);

        $customer = Customer::create([
            'shop_id' => auth()->user()->shop_id,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
        ]);

        return response()->json([
            'success' => true,
            'customer' => $customer
        ]);
    }

    public function show($id)
    {
        $customer = Customer::with('orders')
            ->where(
                'shop_id',
                auth()->user()->shop_id
            )
            ->findOrFail($id);

        return response()->json([
            'customer' => $customer,

            'total' =>
                $customer->orders->count(),

            'total_spend' =>
                $customer->orders->sum('total'),

            'recent_orders' =>
                $customer->orders
                    ->sortByDesc('id')
                    ->take(10)
                    ->values()
        ]);
    }

    public function update(
        Request $request,
        $id
    ) {

        $request->validate([
            'name'  => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'address' => 'nullable|string'
        ]);

        $customer = Customer::where(
            'shop_id',
            auth()->user()->shop_id
        )->findOrFail($id);

        $customer->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Customer Updated',
            'customer' => $customer
        ]);
    }

    public function destroy($id)
    {
        $customer = Customer::where(
            'shop_id',
            auth()->user()->shop_id
        )->findOrFail($id);

        $customer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Customer Deleted'
        ]);
    }
}