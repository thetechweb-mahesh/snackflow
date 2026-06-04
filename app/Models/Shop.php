<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'phone',
        'email',
        'address',
        'logo',
        'status'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}