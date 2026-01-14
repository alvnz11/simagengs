<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Admin
        $admin = User::create([
            'name' => 'Admin Test',
            'email' => 'admin@simagengs.test',
            'password' => Hash::make('password'),
        ]);

        // Intern
        $intern = User::create([
            'name' => 'Intern Test',
            'email' => 'intern@simagengs.test',
            'password' => Hash::make('password'),
        ]);

        // Supervisor
        $supervisor = User::create([
            'name' => 'Supervisor Test',
            'email' => 'supervisor@simagengs.test',
            'password' => Hash::make('password'),
        ]);

        // Dosen
        $dosen = User::create([
            'name' => 'Dosen Test',
            'email' => 'dosen@simagengs.test',
            'password' => Hash::make('password'),
        ]);

        // Ambil role
        $roleAdmin = Role::where('name', 'admin')->first();
        $roleIntern = Role::where('name', 'intern')->first();
        $roleSupervisor = Role::where('name', 'supervisor')->first();
        $roleDosen = Role::where('name', 'dosen')->first();

        // Attach role
        $admin->roles()->attach($roleAdmin->id);
        $intern->roles()->attach($roleIntern->id);
        $supervisor->roles()->attach($roleSupervisor->id);
        $dosen->roles()->attach($roleDosen->id);
    }
}
