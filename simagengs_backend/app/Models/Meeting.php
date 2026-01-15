<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\FuncCall;

class Meeting extends Model
{
    protected $table = 'meetings';
    protected  $fillable = [
        'internship_id',
        'meeting_date',
        'topic',
        'notes',
    ];

    public function internship() {
        return $this->belongsTo(Internship::class);
    }
}
