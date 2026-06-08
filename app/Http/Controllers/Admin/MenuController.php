<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shop;

class MenuController extends Controller
{
    public function index($slug)
    {
        $shop = Shop::where(
            'slug',
            $slug
        )
        ->firstOrFail();

        return response()->json([
            'shop' => $shop,

            'categories' =>
                $shop->categories()
                ->with('items')
                ->get()
        ]);
    }
}