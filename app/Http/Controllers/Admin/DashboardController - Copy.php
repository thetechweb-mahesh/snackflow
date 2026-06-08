<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Item;
use Carbon\Carbon;
use DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $shopId = auth()->user()->shop_id;

        $todaySales = Order::where(
            'shop_id',
            $shopId
        )
        ->whereDate(
            'created_at',
            Carbon::today()
        )
        ->sum('total');

        $todayOrders = Order::where(
            'shop_id',
            $shopId
        )
        ->whereDate(
            'created_at',
            Carbon::today()
        )
        ->count();

        $totalItems = Item::where(
            'shop_id',
            $shopId
        )->count();

        $topItem = OrderItem::select(
            'item_id',
            DB::raw('SUM(qty) as total_qty')
        )
        ->whereHas('order', function ($q) use ($shopId) {

            $q->where(
                'shop_id',
                $shopId
            );

        })
        ->groupBy('item_id')
        ->orderByDesc('total_qty')
        ->with('item')
        ->first();

        $recentOrders = Order::where(
            'shop_id',
            $shopId
        )
        ->latest()
        ->take(5)
        ->get();

        return response()->json([
            'today_sales' => $todaySales,
            'today_orders' => $todayOrders,
            'total_items' => $totalItems,
            'top_item' => $topItem,
            'recent_orders' => $recentOrders,
        ]);
    }
}