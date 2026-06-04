<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
        'name' => 'Super Admin',
        'email' => 'admin@snackflow.com',
        'password' => bcrypt('password'),
        'role' => 'super_admin'
    ]);
    }
}
