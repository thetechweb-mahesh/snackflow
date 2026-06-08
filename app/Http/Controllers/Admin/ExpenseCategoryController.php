<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        return ExpenseCategory::where(
            'shop_id',
            auth()->user()->shop_id
        )
        ->latest()
        ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $category = ExpenseCategory::create([
            'shop_id' => auth()->user()->shop_id,
            'name' => $request->name,
            'status' => true
        ]);

        return response()->json($category);
    }

    public function update(
        Request $request,
        $id
    )
    {
        $category = ExpenseCategory::where(
            'shop_id',
            auth()->user()->shop_id
        )->findOrFail($id);

        $category->update([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Updated'
        ]);
    }

    public function destroy($id)
    {
        $category = ExpenseCategory::where(
            'shop_id',
            auth()->user()->shop_id
        )->findOrFail($id);

        $category->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}