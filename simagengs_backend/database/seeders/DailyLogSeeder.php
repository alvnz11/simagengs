<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\DailyLog;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DailyLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $supervisor = User::where('email', 'supervisor@simagengs.test')->first();
        
        DailyLog::create([
            'internship_id' => 1,
            'date' => '2026-01-01',
            'check_in_time' => '08:00:00',
            'check_out_time' => '17:00:00',
            'activity' => 'Daily sprint and initialization project',
            'status' => 'Progress',
            'approved_by' => $supervisor->id,
            'approved_at' => '2026-01-03',
            'supervisor_comment' => 'Good Job!!'
        ]);
    }
}
