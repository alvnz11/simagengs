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
        Schema::create('daily_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('internship_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->date('date');
            $table->time('check_in_time');
            $table->time('check_out_time');
            $table->text('activity');
            $table->enum('status', [
                'Draft',
                'Progress',
                'Completed',
                'Rejected'
            ])->default('Draft');
            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->cascadeOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->text('supervisor_comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_logs');
    }
};
