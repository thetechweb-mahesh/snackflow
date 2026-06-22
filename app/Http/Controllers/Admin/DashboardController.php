<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Customer;
use App\Models\OrderItem;
use App\Models\Item;
use App\Models\Expense;
use Carbon\Carbon;
use DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $shopId = auth()->user()->shop_id;

        // Today's Expenses
        $todayExpenses = Expense::where(
            'shop_id',
            $shopId
        )
        ->whereDate(
            'expense_date',
            Carbon::today()
        )
        ->sum('amount');

        // Today's Sales
        $todaySales = Order::where(
            'shop_id',
            $shopId
        )
        ->whereDate(
            'created_at',
            Carbon::today()
        )
        ->sum('total');

        // Today's Profit
        $todayProfit = $todaySales - $todayExpenses;

        // Today's Orders
        $todayOrders = Order::where(
            'shop_id',
            $shopId
        )
        ->whereDate(
            'created_at',
            Carbon::today()
        )
        ->count();
        
        $customers = Customer::where(
            'shop_id',
            $shopId
        )->count();
        // Total Items
        $totalItems = Item::where(
            'shop_id',
            $shopId
        )->count();

        // Top Selling Item
        $topItem = OrderItem::select(
            'item_id',
            DB::raw('SUM(qty) as total_qty')
        )
        ->whereHas('order', function ($query) use ($shopId) {

            $query->where(
                'shop_id',
                $shopId
            );

        })
        ->groupBy('item_id')
        ->orderByDesc('total_qty')
        ->with('item')
        ->first();

        // Recent Orders
        $recentOrders = Order::where(
            'shop_id',
            $shopId
        )
        ->latest()
        ->take(5)
        ->get();

        return response()->json([
            'today_sales'    => $todaySales,
            'today_expenses' => $todayExpenses,
            'today_profit'   => $todayProfit,
            'today_orders'   => $todayOrders,
            'customers' => $customers,
            'total_items'    => $totalItems,
            'top_item'       => $topItem,
            'recent_orders'  => $recentOrders,
        ]);
    }
}