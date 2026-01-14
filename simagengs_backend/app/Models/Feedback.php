<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedbacks';
    protected $fillable = [
        'internship_id',
        'period_start',
        'period_end',
        'score',
        'comment',
    ];

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }
}
