<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        return Expense::with('category')
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
            'expense_category_id' => 'required',
            'amount' => 'required|numeric',
            'expense_date' => 'required'
        ]);

        $expense = Expense::create([
            'shop_id' => auth()->user()->shop_id,
            'expense_category_id' =>
                $request->expense_category_id,
            'amount' => $request->amount,
            'notes' => $request->notes,
            'expense_date' =>
                $request->expense_date
        ]);

        return response()->json($expense);
    }
//


public function update(Request $request, $id)
{
    $expense = Expense::where(
        'shop_id',
        auth()->user()->shop_id
    )->findOrFail($id);

    $expense->update([
        'expense_category_id' => $request->expense_category_id,
        'amount' => $request->amount,
        'expense_date' => $request->expense_date,
        'notes' => $request->notes,
    ]);

    return response()->json([
        'message' => 'Updated'
    ]);
}//

    public function destroy($id)
    {
        $expense = Expense::where(
            'shop_id',
            auth()->user()->shop_id
        )->findOrFail($id);

        $expense->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}