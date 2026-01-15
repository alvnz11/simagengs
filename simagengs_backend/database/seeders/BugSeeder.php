<?php

namespace Database\Seeders;

use App\Models\Bug;
use App\Models\DailyLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BugSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $daily_log = DailyLog::where('status', 'Progress')->first();
        Bug::create([
            'daily_log_id' => $daily_log->id,
            'title' => 'login bug',
            'description' => 'user cant login to system',
            'status' => 'New',
            'reported_at' => '2026-01-08'
        ]);
    }
}
