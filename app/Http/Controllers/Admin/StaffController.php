<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
class StaffController extends Controller
{
  
//    public function index()
// {
//     return User::where(
//         'shop_id',
//         auth()->user()->shop_id
//     )
//     ->where('role', 'staff')
//     ->latest()
//     ->get();
// }
public function __construct()
{
    if(auth()->user()?->role !== 'owner')
    {
        abort(403);
    }
}

public function index()
{
    if(
        auth()->user()->role
        !== 'owner'
    ){
        abort(403);
    }

    return User::where(
        'shop_id',
        auth()->user()->shop_id
    )
    ->where('role','staff')
    ->get();
}


public function show($id)
{
    return User::where(
        'shop_id',
        auth()->user()->shop_id
    )
    ->where('role', 'staff')
    ->findOrFail($id);
}
public function store(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|confirmed|min:6',
    ]);

    $staff = User::create([
        'shop_id' => auth()->user()->shop_id,
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'staff',
    ]);

    return response()->json([
        'success' => true,
        'staff' => $staff
    ]);
}

public function update(Request $request, $id)
{
    $staff = User::where(
        'shop_id',
        auth()->user()->shop_id
    )
    ->where('role', 'staff')
    ->findOrFail($id);

    $staff->name = $request->name;
    $staff->email = $request->email;

    if ($request->filled('password')) {

        $staff->password =
            Hash::make(
                $request->password
            );
    }

    $staff->save();

    return response()->json([
        'success' => true
    ]);
}


public function destroy($id)
{
    $staff = User::where(
        'shop_id',
        auth()->user()->shop_id
    )
    ->where('role', 'staff')
    ->findOrFail($id);

    $staff->delete();

    return response()->json([
        'success' => true
    ]);
}
}
