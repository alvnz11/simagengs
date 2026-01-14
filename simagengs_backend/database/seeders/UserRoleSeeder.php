<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@simagengs.test')->first();
        $intern = User::where('email', 'intern@simagengs.test')->first();
        $supervisor = User::where('email', 'supervisor@simagengs.test')->first();
        $dosen = User::where('email', 'dosen@simagengs.test')->first();

        $roleAdmin = Role::where('name', 'admin')->first();
        $roleIntern = Role::where('name', 'intern')->first();
        $roleSupervisor = Role::where('name', 'supervisor')->first();
        $roleDosen = Role::where('name', 'dosen')->first();

        $admin->roles()->sync([$roleAdmin->id]);
        $intern->roles()->sync([$roleIntern->id]);
        $supervisor->roles()->sync([$roleSupervisor->id]);
        $dosen->roles()->sync([$roleDosen->id]);
    }
}
