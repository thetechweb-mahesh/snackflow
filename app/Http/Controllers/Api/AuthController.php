<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Shop;
class AuthController extends Controller
{
public function register(Request $request)
{
    $request->validate([
        'shop_name' => 'required|string|max:255',
        'name'      => 'required|string|max:255',
        'email'     => 'required|email|unique:users,email',
        'password'  => 'required|min:6|confirmed',
    ]);

    DB::beginTransaction();

    try {

        $shop = Shop::create([
            'name' => $request->shop_name,
            'slug' => Str::slug($request->shop_name) . '-' . time(),
        ]);

        $user = User::create([
            'shop_id'  => $shop->id,
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'owner',
        ]);

        $token = $user->createToken('snackflow')->plainTextToken;

        DB::commit();

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'token'   => $token,
            'user'    => [
                'id'      => $user->id,
                'shop_id' => $user->shop_id,
                'name'    => $user->name,
                'email'   => $user->email,
                'role'    => $user->role,
            ],
            'shop' => [
                'id'   => $shop->id,
                'name' => $shop->name,
                'slug' => $shop->slug,
            ]
        ], 201);

    } catch (\Exception $e) {

        DB::rollBack();

        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }

}
    //Login

    public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    $user = Auth::user();

    $token = $user->createToken('snackflow')->plainTextToken;

    return response()->json([
        'success' => true,
        'token'   => $token,
        'user'    => [
            'id'      => $user->id,
            'shop_id' => $user->shop_id,
            'name'    => $user->name,
            'email'   => $user->email,
            'role'    => $user->role,
        ]
    ]);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
}
}