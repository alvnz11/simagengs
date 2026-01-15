<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';
    protected $fillable = [
        'internship_id',
        'title',
        'description',
        'status',
        'due_date',
    ];


    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }
}
