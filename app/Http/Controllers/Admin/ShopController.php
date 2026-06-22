<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ShopController extends Controller
{
    public function publicShop($slug)
{
    return Shop::where(
        'slug',
        $slug
    )->firstOrFail();
}
    public function store(StoreShopRequest $request)
    {
        DB::beginTransaction();

        try {

            $shop = Shop::create([
                'name' => $request->shop_name,
                'slug' => Str::slug($request->shop_name),
                'phone' => $request->phone,
                'email' => $request->email,
                'status' => true
            ]);

            $owner = User::create([
                'shop_id' => $shop->id,
                'name' => $request->owner_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'owner'
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Shop Created Successfully',
                'shop' => $shop,
                'owner' => $owner
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ],500);
        }
    }



    //


public function getSettings()
{
    return Shop::findOrFail(auth()->user()->shop_id);
}
  public function updateSettings(Request $request)
{
    try {

        $shop = Shop::findOrFail(
            auth()->user()->shop_id
        );

        $shop->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
        ]);

        return response()->json([
            'success' => true
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ], 500);
    }
}
}