<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Admin\ShopController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\OrderController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/logout', [AuthController::class, 'logout']);
    
    //shoprout
    Route::post('/shops', [ShopController::class, 'store']);

    //CategoryController
    Route::get(
        '/categories',
        [CategoryController::class,'index']
    );

    Route::post(
        '/categories',
        [CategoryController::class,'store']
    );
    Route::apiResource('categories', CategoryController::class);

    //ItemController
     Route::get(
        '/items',
        [ItemController::class,'index']
    );

    Route::post(
        '/items',
        [ItemController::class,'store']
    );
        Route::apiResource('items', ItemController::class);

     //OrderController
     
       Route::post(
        '/orders',
        [OrderController::class,'store']
    );
});

