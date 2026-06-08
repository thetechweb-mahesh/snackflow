<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    protected $fillable = [
        'shop_id',
        'name',
        'status'
    ];

    public function expenses()
{
    return $this->hasMany(
        Expense::class
    );
}
}
