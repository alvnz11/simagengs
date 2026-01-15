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
        Schema::create('bugs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_log_id')
                ->constrained('daily_logs')
                ->cascadeOnDelete();
            $table->string('title');
            $table->text('description');
            $table->enum('status', [
                'New',
                'Progress',
                'Fixed',
                'Rejected'
            ])->default('Draft');
            $table->date('reported_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bugs');
    }
};
