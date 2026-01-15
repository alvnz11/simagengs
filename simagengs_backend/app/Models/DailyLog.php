<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyLog extends Model
{
    protected $table = 'daily_logs';
    protected $fillable = [
        'internship_id',
        'date',
        'check_in_time',
        'check_out_time',
        'activity',
        'status',
        'approved_by',
        'approved_at',
        'supervisor_comment',
    ];

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
