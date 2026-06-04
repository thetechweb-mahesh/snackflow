<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    
public function index()
{
    return Item::with('category')
        ->where(
            'shop_id',
            auth()->user()->shop_id
        )
        ->latest()
        ->get();
}
public function store(Request $request)
{
    $request->validate([
        'category_id' => 'required',
        'name' => 'required',
        'price' => 'required|numeric'
    ]);

    $item = Item::create([
        'shop_id' => auth()->user()->shop_id,
        'category_id' => $request->category_id,
        'name' => $request->name,
        'price' => $request->price,
        'cost_price' => $request->cost_price ?? 0,
        'status' => true
    ]);

    return response()->json($item);
}
public function update(Request $request, $id)
{
    $item = Item::where(
        'shop_id',
        auth()->user()->shop_id
    )->findOrFail($id);

    $item->update([
        'category_id' => $request->category_id,
        'name' => $request->name,
        'price' => $request->price,
        'cost_price' => $request->cost_price,
    ]);

    return response()->json([
        'message' => 'Item updated successfully'
    ]);
}
public function destroy(Item $item)
{
    $item->delete();

    return response()->json([
        'message' => 'Item Deleted'
    ]);
}
}
