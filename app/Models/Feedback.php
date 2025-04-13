<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $guarded = ['id'];

    public function toArray()
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customer_name,
            'message' => $this->message,
            'rating' => $this->rating,
            'date' => $this->created_at->toDayDateTimeString()
        ];
    }
}
