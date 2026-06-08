<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Expense;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function summary(Request $request)
    {
        $shopId = auth()->user()->shop_id;

        $from = $request->from ?? now()->startOfMonth()->toDateString();
        $to = $request->to ?? now()->toDateString();

        $sales = Order::where('shop_id', $shopId)
            ->whereBetween('created_at', [
                $from . ' 00:00:00',
                $to . ' 23:59:59'
            ])
            ->sum('total');

        $expenses = Expense::where('shop_id', $shopId)
            ->whereBetween('expense_date', [
                $from,
                $to
            ])
            ->sum('amount');

        $orders = Order::where('shop_id', $shopId)
            ->whereBetween('created_at', [
                $from . ' 00:00:00',
                $to . ' 23:59:59'
            ])
            ->count();

        return response()->json([
            'sales' => $sales,
            'expenses' => $expenses,
            'profit' => $sales - $expenses,
            'orders' => $orders,
        ]);
    }
}