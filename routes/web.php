<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('feedback/index');
})->name('home');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
