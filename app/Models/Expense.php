<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = [
    'shop_id',
    'expense_category_id',
    'amount',
    'notes',
    'expense_date'
];

public function category()
{
    return $this->belongsTo(
        ExpenseCategory::class,
        'expense_category_id'
    );
}
}
