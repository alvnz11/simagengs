<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Internship;
use App\Models\User;

class InternshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $intern = User::where('email', 'intern@simagengs.test')->first();
        $supervisor = User::where('email', 'supervisor@simagengs.test')->first();
        $dosen = User::where('email', 'dosen@simagengs.test')->first();

        Internship::create([
            'intern_id' => $intern->id,
            'supervisor_id' => $supervisor->id,
            'dosen_id' => $dosen->id,
            'company_name' => 'PT Tekichi',
            'position' => 'Full Stack Web Developer',
            'start_date' => '2026-01-01',
            'end_date' => '2026-04-01',
            'status' => 'active'
        ]);
    }
}
