<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Exception;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Throwable;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedbacks = Feedback::latest();

        if(request()->filled('rating') && request()->query('rating') !== 'all') {
            $feedbacks = $feedbacks->where('rating', request()->query('rating'));
        }

        return $feedbacks->paginate(10);;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'customer_name' => ['required', 'min:2'],
                'message' => ['required'],
                'rating' => ['nullable', Rule::in([1, 2, 3, 4, 5])],
            ]);

            return response()->json(['data' => Feedback::create($validatedData)]);
        } catch (Exception $exception) {

            if($exception instanceof ValidationException) {
                return response()->json($exception->errors(), $exception->status);
            }

            return response()->json($exception->getMessage(), $exception?->status);
           
        }
    }
}
