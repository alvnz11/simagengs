<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ActivityLog;
use App\Models\User;

class ActivityLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@simagengs.test')->first();
        $intern = User::where('email', 'intern@simagengs.test')->first();

        ActivityLog::create([
            'user_id' => $admin->id,
            'action' => 'login',
            'description' => 'Admin logged in',
        ]);

        ActivityLog::create([
            'user_id' => $intern->id,
            'action' => 'create',
            'description' => 'Intern created first daily log',
        ]);
    }
}
