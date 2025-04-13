<?php

use App\Http\Controllers\Api\FeedbackController;

use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/feedback', [FeedbackController::class, 'store'])->name('api.feedback.store');
Route::get('/feedback', [FeedbackController::class, 'index'])->name('api.feedback.index');
