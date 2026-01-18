<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    protected $fillable = [
        'intern_id',
        'supervisor_id',
        'dosen_id',
        'company_name',
        'position',
        'start_date',
        'end_date',
        'status'
    ];

    public function intern()
    {
        return $this->belongsTo(User::class, 'intern_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function dosen()
    {
        return $this->belongsTo(User::class, 'dosen_id');
    }

    public function dailyLogs()
    {
        return $this->hasMany(DailyLog::class);
    }
}
