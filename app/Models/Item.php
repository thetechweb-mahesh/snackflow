<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'shop_id',
        'category_id',
        'name',
        'price',
        'cost_price',
        'image',
        'status'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}