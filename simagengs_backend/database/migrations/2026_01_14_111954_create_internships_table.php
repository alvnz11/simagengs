<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intern_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('supervisor_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('dosen_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->string('company_name');
            $table->string('position');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', [
                'registered',
                'active',
                'finished',
                'rejected'
            ])->default('registered');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
