<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bug extends Model
{
    protected $table = 'bugs';
    protected $fillable = [
        'daily_log_id',
        'title',
        'description',
        'status',
        'reported_at'
    ];

    public function daily_log()
    {
        return $this->belongsTo(DailyLog::class);
    }
}
