<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'shop_id',
        'name',
        'status'
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
    public function items()
{
    return $this->hasMany(Item::class);
}
}